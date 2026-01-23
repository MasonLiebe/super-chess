// Chess board colors
export const COLORS = {
  SQUARE_DARK: '#a97d5d',
  SQUARE_LIGHT: '#f7dcb4',
  HIGHLIGHT_FROM: 'rgba(92, 147, 94, 0.7)',
  HIGHLIGHT_TO: 'rgba(153, 186, 130, 0.7)',
  HIGHLIGHT_POSSIBLE_FROM: 'rgba(213, 197, 87, 0.7)',
  HIGHLIGHT_POSSIBLE_TO: 'rgba(217, 191, 119, 0.6)',
  HIGHLIGHT_CHECK: 'rgba(255, 0, 0, 0.5)',
  DISABLED: 'rgb(87, 87, 87)',
};

// RetroUI theme colors (neobrutalism)
export const THEME = {
  primary: '#ff6b6b',
  secondary: '#4ecdc4',
  accent: '#ffe66d',
  dark: '#2d3436',
  light: '#f8f9fa',
  border: '#2d3436',
  shadow: '4px 4px 0px #2d3436',
};

// Board size constraints
export const BOARD_SIZE = {
  MIN: 4,
  MAX: 16,
  DEFAULT: 8,
};

// Piece name mapping for images
export const PIECE_NAMES: Record<string, string> = {
  k: 'king',
  q: 'queen',
  r: 'rook',
  b: 'bishop',
  n: 'knight',
  p: 'pawn',
};

// Generate tiles for a custom sized board
export function generateTiles(width: number, height: number) {
  const tiles = [];
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

// Generate standard chess pieces scaled to board size
export function generatePieces(width: number, height: number) {
  const pieces = [];

  // For boards smaller than 8, we reduce piece count
  // For boards larger than 8, we keep standard setup in the center or expand

  if (width < 4 || height < 4) {
    // Minimum viable: just kings
    pieces.push({ owner: 0, x: Math.floor(width / 2), y: 0, pieceType: 'k' });
    pieces.push({ owner: 1, x: Math.floor(width / 2), y: height - 1, pieceType: 'k' });
    return pieces;
  }

  // Standard 8x8 back row pattern
  const standardBackRow = ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'];

  // Calculate how many pieces fit
  const pieceCount = Math.min(width, 8);
  const startX = Math.floor((width - pieceCount) / 2);

  // Generate back row pattern that fits
  let backRow: string[] = [];
  if (pieceCount >= 8) {
    backRow = standardBackRow;
  } else if (pieceCount >= 5) {
    // Reduced: r, n, k, n, r or similar
    const center = Math.floor(pieceCount / 2);
    backRow = new Array(pieceCount).fill('p');
    backRow[center] = 'k';
    if (pieceCount >= 6) {
      backRow[0] = 'r';
      backRow[pieceCount - 1] = 'r';
    }
    if (pieceCount >= 7) {
      backRow[1] = 'n';
      backRow[pieceCount - 2] = 'n';
    }
    if (pieceCount >= 5 && center > 0) {
      backRow[center - 1] = 'q';
    }
  } else {
    // Very small: just king and maybe a rook
    backRow = new Array(pieceCount).fill('p');
    backRow[Math.floor(pieceCount / 2)] = 'k';
    if (pieceCount >= 3) {
      backRow[0] = 'r';
    }
  }

  // White pieces (bottom)
  for (let i = 0; i < pieceCount; i++) {
    pieces.push({ owner: 0, x: startX + i, y: 0, pieceType: backRow[i] });
  }

  // White pawns (if board is tall enough)
  if (height >= 4) {
    const pawnCount = Math.min(width, pieceCount);
    for (let i = 0; i < pawnCount; i++) {
      pieces.push({ owner: 0, x: startX + i, y: 1, pieceType: 'p' });
    }
  }

  // Black pieces (top)
  for (let i = 0; i < pieceCount; i++) {
    pieces.push({ owner: 1, x: startX + i, y: height - 1, pieceType: backRow[i] });
  }

  // Black pawns
  if (height >= 4) {
    const pawnCount = Math.min(width, pieceCount);
    for (let i = 0; i < pawnCount; i++) {
      pieces.push({ owner: 1, x: startX + i, y: height - 2, pieceType: 'p' });
    }
  }

  return pieces;
}

// Create a complete game state for a custom board size
export function createGameState(width: number, height: number) {
  return {
    width: Math.max(BOARD_SIZE.MIN, Math.min(BOARD_SIZE.MAX, width)),
    height: Math.max(BOARD_SIZE.MIN, Math.min(BOARD_SIZE.MAX, height)),
    toMove: 0,
    tiles: generateTiles(width, height),
    pieces: generatePieces(width, height),
    movementPatterns: {},
  };
}

// Default 8x8 game state
export const DEFAULT_GAME_STATE = createGameState(8, 8);
