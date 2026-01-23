import { useState, useEffect, useCallback, useRef } from 'react';
import init, { Protochess } from 'protochess-engine-wasm';
import type { GameState } from '../types/chess';

interface UseChessEngineResult {
  engine: Protochess | null;
  isReady: boolean;
  error: Error | null;
  // Convenience methods
  getState: () => GameState | null;
  makeMove: (x1: number, y1: number, x2: number, y2: number) => boolean;
  getMovesFrom: (x: number, y: number) => [number, number][];
  playAiMove: (timeoutMs?: number) => Promise<boolean>;
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
      return engine.get_state() as GameState;
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

  const playAiMove = useCallback(async (timeoutMs: number = 2000): Promise<boolean> => {
    if (!engine) return false;

    return new Promise((resolve) => {
      // Use setTimeout to not block the UI
      setTimeout(() => {
        try {
          const depth = engine.play_best_move_timeout(timeoutMs);
          resolve(depth >= 0);
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
      return engine.set_state(state);
    } catch {
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
