// Conversion utilities between TypeScript camelCase and Rust snake_case formats
// The server expects snake_case, but we use camelCase in TypeScript

import type { GameState, GameInfo, Turn, Piece, MovesFrom } from '../types/chess';

// ==================== Outbound (to server) ====================

// Convert TypeScript camelCase GameState to Rust snake_case format
export function toRustGameState(state: GameState): unknown {
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

// Convert TypeScript Turn to Rust format
export function toRustTurn(turn: Turn): unknown {
  return {
    promote_to: turn.promoteTo,
    from: turn.from,
    to: turn.to,
  };
}

// ==================== Inbound (from server) ====================

// Convert Rust snake_case GameState to TypeScript camelCase format
export function fromRustGameState(rustState: {
  width: number;
  height: number;
  to_move: number;
  tiles: { x: number; y: number; tile_type: string }[];
  pieces: { owner: number; x: number; y: number; piece_type: string }[];
  movement_patterns: Record<string, unknown>;
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
    // MovementPattern fields come as camelCase from Rust
    movementPatterns: rustState.movement_patterns as GameState['movementPatterns'],
  };
}

// Convert Rust Piece to TypeScript format
export function fromRustPiece(rustPiece: {
  owner: number;
  x: number;
  y: number;
  piece_type: string;
}): Piece {
  return {
    owner: rustPiece.owner,
    x: rustPiece.x,
    y: rustPiece.y,
    pieceType: rustPiece.piece_type,
  };
}

// Convert Rust Turn to TypeScript format
export function fromRustTurn(rustTurn: {
  promote_to: string | null;
  from: [number, number];
  to: [number, number];
} | null): Turn | null {
  if (!rustTurn) return null;
  return {
    promoteTo: rustTurn.promote_to,
    from: rustTurn.from,
    to: rustTurn.to,
  };
}

// Convert full GameInfo response from server
export function fromRustGameInfo(rustGameInfo: {
  winner: string | null;
  to_move_in_check: boolean;
  in_check_kings: { owner: number; x: number; y: number; piece_type: string }[] | null;
  last_turn: { promote_to: string | null; from: [number, number]; to: [number, number] } | null;
  state: {
    width: number;
    height: number;
    to_move: number;
    tiles: { x: number; y: number; tile_type: string }[];
    pieces: { owner: number; x: number; y: number; piece_type: string }[];
    movement_patterns: Record<string, unknown>;
  };
}): GameInfo {
  return {
    winner: rustGameInfo.winner,
    to_move_in_check: rustGameInfo.to_move_in_check,
    in_check_kings: rustGameInfo.in_check_kings?.map(fromRustPiece) ?? null,
    last_turn: fromRustTurn(rustGameInfo.last_turn),
    state: fromRustGameState(rustGameInfo.state),
  };
}

// Convert MovesFrom response from server
export function fromRustMovesFrom(rustMovesFrom: {
  from: [number, number];
  to: [number, number][];
}): MovesFrom {
  return {
    from: rustMovesFrom.from,
    to: rustMovesFrom.to,
  };
}
