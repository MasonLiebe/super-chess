import { create } from 'zustand';
import type { GameState, Piece, Tile, MovementPattern, Slides } from '../types/chess';
import { BOARD_SIZE } from '../lib/constants';

// Standard pieces that have predefined movement
export const STANDARD_PIECES = ['k', 'q', 'r', 'b', 'n', 'p'] as const;

// Custom piece icons that have images available (non-standard pieces with SVGs)
export const CUSTOM_PIECE_CHARS = ['a', 'c', 'd', 'e', 'f', 'g', 'u', 'y', 'z'] as const;

export type EditorTool = 'placePiece' | 'toggleTile';
export type PieceOwner = 0 | 1;

const createEmptySlides = (): Slides => ({
  north: false,
  east: false,
  south: false,
  west: false,
  northeast: false,
  northwest: false,
  southeast: false,
  southwest: false,
});

export const createEmptyMovementPattern = (): MovementPattern => ({
  attackSlides: createEmptySlides(),
  translateSlides: createEmptySlides(),
  attackJumps: [],
  translateJumps: [],
  attackSlideDeltas: [],
  translateSlideDeltas: [],
});

function generateTiles(width: number, height: number): Tile[] {
  const tiles: Tile[] = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      tiles.push({
        x,
        y,
        tileType: (x + y) % 2 === 0 ? 'w' : 'b',
      });
    }
  }
  return tiles;
}

interface EditorStore {
  // Board configuration
  width: number;
  height: number;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;

  // Game state
  tiles: Tile[];
  pieces: Piece[];
  movementPatterns: Record<string, MovementPattern>;

  // Editor tools
  currentTool: EditorTool;
  setCurrentTool: (tool: EditorTool) => void;

  // Piece placement
  selectedPieceType: string;
  setSelectedPieceType: (type: string) => void;
  selectedOwner: PieceOwner;
  setSelectedOwner: (owner: PieceOwner) => void;

  // Piece editor modal
  editingPiece: string | null;
  setEditingPiece: (piece: string | null) => void;

  // Actions
  toggleTile: (x: number, y: number) => void;
  placePiece: (x: number, y: number) => void;
  removePiece: (x: number, y: number) => void;
  setMovementPattern: (pieceType: string, pattern: MovementPattern) => void;
  removeMovementPattern: (pieceType: string) => void;

  // Get full game state
  getGameState: () => GameState;

  // Reset to default
  resetBoard: () => void;
  loadGameState: (state: GameState) => void;

  // Check if a custom piece has a movement pattern defined
  hasMovementPattern: (pieceType: string) => boolean;
}

export const useEditorStore = create<EditorStore>((set, get) => ({
  // Board configuration
  width: BOARD_SIZE.DEFAULT,
  height: BOARD_SIZE.DEFAULT,

  setWidth: (width) => {
    const clampedWidth = Math.max(BOARD_SIZE.MIN, Math.min(BOARD_SIZE.MAX, width));
    set((state) => {
      // Regenerate tiles and filter pieces that are out of bounds
      const tiles = generateTiles(clampedWidth, state.height);
      const pieces = state.pieces.filter((p) => p.x < clampedWidth);
      return { width: clampedWidth, tiles, pieces };
    });
  },

  setHeight: (height) => {
    const clampedHeight = Math.max(BOARD_SIZE.MIN, Math.min(BOARD_SIZE.MAX, height));
    set((state) => {
      const tiles = generateTiles(state.width, clampedHeight);
      const pieces = state.pieces.filter((p) => p.y < clampedHeight);
      return { height: clampedHeight, tiles, pieces };
    });
  },

  // Game state
  tiles: generateTiles(BOARD_SIZE.DEFAULT, BOARD_SIZE.DEFAULT),
  pieces: [],
  movementPatterns: {},

  // Editor tools
  currentTool: 'placePiece',
  setCurrentTool: (currentTool) => set({ currentTool }),

  // Piece placement
  selectedPieceType: 'p',
  setSelectedPieceType: (selectedPieceType) => set({ selectedPieceType }),
  selectedOwner: 0,
  setSelectedOwner: (selectedOwner) => set({ selectedOwner }),

  // Piece editor modal
  editingPiece: null,
  setEditingPiece: (editingPiece) => set({ editingPiece }),

  // Actions
  toggleTile: (x, y) => {
    set((state) => {
      const tiles = state.tiles.map((t) => {
        if (t.x === x && t.y === y) {
          // Toggle between normal and disabled ('x')
          const newType = t.tileType === 'x'
            ? ((x + y) % 2 === 0 ? 'w' : 'b')
            : 'x';
          return { ...t, tileType: newType };
        }
        return t;
      });
      // Remove any piece on disabled tile
      const pieces = tiles.find((t) => t.x === x && t.y === y)?.tileType === 'x'
        ? state.pieces.filter((p) => !(p.x === x && p.y === y))
        : state.pieces;
      return { tiles, pieces };
    });
  },

  placePiece: (x, y) => {
    set((state) => {
      // Check if tile is disabled
      const tile = state.tiles.find((t) => t.x === x && t.y === y);
      if (tile?.tileType === 'x') return state;

      // Check if there's an existing piece at this location
      const existingPiece = state.pieces.find((p) => p.x === x && p.y === y);

      // If same piece type and owner exists, remove it (toggle off)
      if (existingPiece &&
          existingPiece.pieceType === state.selectedPieceType &&
          existingPiece.owner === state.selectedOwner) {
        return { pieces: state.pieces.filter((p) => !(p.x === x && p.y === y)) };
      }

      // Remove existing piece at this location (if different type/owner)
      const filteredPieces = state.pieces.filter((p) => !(p.x === x && p.y === y));

      // Add new piece
      const newPiece: Piece = {
        owner: state.selectedOwner,
        x,
        y,
        pieceType: state.selectedPieceType,
      };

      return { pieces: [...filteredPieces, newPiece] };
    });
  },

  removePiece: (x, y) => {
    set((state) => ({
      pieces: state.pieces.filter((p) => !(p.x === x && p.y === y)),
    }));
  },

  setMovementPattern: (pieceType, pattern) => {
    set((state) => ({
      movementPatterns: {
        ...state.movementPatterns,
        [pieceType]: pattern,
      },
    }));
  },

  removeMovementPattern: (pieceType) => {
    set((state) => {
      const { [pieceType]: _, ...rest } = state.movementPatterns;
      return { movementPatterns: rest };
    });
  },

  getGameState: () => {
    const state = get();
    return {
      width: state.width,
      height: state.height,
      toMove: 0,
      tiles: state.tiles,
      pieces: state.pieces,
      movementPatterns: state.movementPatterns,
    };
  },

  resetBoard: () => {
    set({
      width: BOARD_SIZE.DEFAULT,
      height: BOARD_SIZE.DEFAULT,
      tiles: generateTiles(BOARD_SIZE.DEFAULT, BOARD_SIZE.DEFAULT),
      pieces: [],
      movementPatterns: {},
    });
  },

  loadGameState: (state) => {
    set({
      width: state.width,
      height: state.height,
      tiles: state.tiles,
      pieces: state.pieces,
      movementPatterns: state.movementPatterns,
    });
  },

  hasMovementPattern: (pieceType) => {
    return pieceType in get().movementPatterns;
  },
}));
