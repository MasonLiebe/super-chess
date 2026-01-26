import { useState, useEffect, useCallback, useRef } from 'react';
import init, { Protochess } from 'protochess-engine-wasm';
import type { GameState, MovementPattern } from '../types/chess';

// Convert TypeScript camelCase GameState to Rust snake_case format
// Rust structs expect: to_move, tile_type, piece_type, movement_patterns
// MovementPattern has #[serde(rename_all = "camelCase")] so those fields stay camelCase
function toRustGameState(state: GameState): unknown {
  return {
    width: state.width,
    height: state.height,
    to_move: state.toMove,
    tiles: state.tiles.map((tile) => ({
      x: tile.x,
      y: tile.y,
      tile_type: tile.tileType,
    })),
    pieces: state.pieces.map((piece) => ({
      owner: piece.owner,
      x: piece.x,
      y: piece.y,
      piece_type: piece.pieceType,
    })),
    // MovementPattern fields stay camelCase due to #[serde(rename_all = "camelCase")] in Rust
    movement_patterns: state.movementPatterns,
  };
}

// Convert Rust snake_case GameState to TypeScript camelCase format
function fromRustGameState(rustState: {
  width: number;
  height: number;
  to_move: number;
  tiles: { x: number; y: number; tile_type: string }[];
  pieces: { owner: number; x: number; y: number; piece_type: string }[];
  movement_patterns: Record<string, MovementPattern>;
}): GameState {
  return {
    width: rustState.width,
    height: rustState.height,
    toMove: rustState.to_move,
    tiles: rustState.tiles.map((tile) => ({
      x: tile.x,
      y: tile.y,
      tileType: tile.tile_type,
    })),
    pieces: rustState.pieces.map((piece) => ({
      owner: piece.owner,
      x: piece.x,
      y: piece.y,
      pieceType: piece.piece_type,
    })),
    movementPatterns: rustState.movement_patterns,
  };
}

interface UseChessEngineResult {
  engine: Protochess | null;
  isReady: boolean;
  error: Error | null;
  // Convenience methods
  getState: () => GameState | null;
  makeMove: (x1: number, y1: number, x2: number, y2: number) => boolean;
  getMovesFrom: (x: number, y: number) => [number, number][];
  playAiMove: (depth?: number) => Promise<boolean>;
  isInCheck: () => boolean;
  setState: (state: GameState) => boolean;
  reset: () => void;
}

export function useChessEngine(): UseChessEngineResult {
  const [engine, setEngine] = useState<Protochess | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const initRef = useRef(false);

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    const initEngine = async () => {
      try {
        // Try to initialize with the WASM file from public folder
        await init({ module_or_path: '/protochess_engine_wasm_bg.wasm' });
        const protochess = new Protochess();
        setEngine(protochess);
        setIsReady(true);
      } catch (err) {
        console.error('Failed to initialize chess engine:', err);
        setError(err instanceof Error ? err : new Error('Failed to initialize engine'));
      }
    };

    initEngine();
  }, []);

  const getState = useCallback((): GameState | null => {
    if (!engine) return null;
    try {
      const rustState = engine.get_state();
      return fromRustGameState(rustState);
    } catch {
      return null;
    }
  }, [engine]);

  const makeMove = useCallback((x1: number, y1: number, x2: number, y2: number): boolean => {
    if (!engine) return false;
    try {
      return engine.make_move(x1, y1, x2, y2);
    } catch {
      return false;
    }
  }, [engine]);

  const getMovesFrom = useCallback((x: number, y: number): [number, number][] => {
    if (!engine) return [];
    try {
      const moves = engine.moves_from(x, y);
      return Array.isArray(moves) ? moves : [];
    } catch {
      return [];
    }
  }, [engine]);

  const playAiMove = useCallback(async (depth: number = 5): Promise<boolean> => {
    if (!engine) return false;

    return new Promise((resolve) => {
      // Use setTimeout to not block the UI
      setTimeout(() => {
        try {
          // Depth-based search
          const success = engine.play_best_move(depth);
          resolve(success);
        } catch {
          resolve(false);
        }
      }, 10);
    });
  }, [engine]);

  const isInCheck = useCallback((): boolean => {
    if (!engine) return false;
    try {
      return engine.to_move_in_check();
    } catch {
      return false;
    }
  }, [engine]);

  const setState = useCallback((state: GameState): boolean => {
    if (!engine) return false;
    try {
      const rustState = toRustGameState(state);
      return engine.set_state(rustState);
    } catch (err) {
      console.error('Failed to set state:', err);
      return false;
    }
  }, [engine]);

  const reset = useCallback(() => {
    if (engine) {
      engine.free();
    }
    try {
      const newEngine = new Protochess();
      setEngine(newEngine);
    } catch (err) {
      console.error('Failed to reset engine:', err);
    }
  }, [engine]);

  return {
    engine,
    isReady,
    error,
    getState,
    makeMove,
    getMovesFrom,
    playAiMove,
    isInCheck,
    setState,
    reset,
  };
}
