import { useCallback } from 'react';
import { useGameStore } from '../../stores/gameStore';
import { COLORS } from '../../lib/constants';
import type { GameState, Piece as PieceType, Turn } from '../../types/chess';

const MAX_BOARD_SIZE_PX = 560; // Maximum board size in pixels

interface BoardProps {
  gameState: GameState;
  playerNum?: number;
  flipped?: boolean;
  lastTurn?: Turn | null;
  inCheckKings?: PieceType[] | null;
  onTileClick?: (x: number, y: number) => void;
  onMove?: (from: [number, number], to: [number, number]) => void;
  onRequestMoves?: (x: number, y: number) => void;
  disabled?: boolean;
}

export function Board({
  gameState,
  playerNum = 0,
  flipped = false,
  lastTurn,
  inCheckKings,
  onTileClick,
  onMove,
  onRequestMoves,
  disabled = false,
}: BoardProps) {
  const { movesFrom, selectedSquare, setSelectedSquare, setMovesFrom } = useGameStore();

  const { width, height } = gameState;

  // Calculate tile size based on the larger dimension to keep tiles square
  // Use Math.floor to avoid floating point issues causing tiles to poke out
  const maxDimension = Math.max(width, height);
  const tileSize = Math.floor(MAX_BOARD_SIZE_PX / maxDimension);

  // Calculate actual board dimensions using integer tile size
  const boardWidthPx = tileSize * width;
  const boardHeightPx = tileSize * height;

  const handleTileClick = useCallback(
    (x: number, y: number) => {
      if (disabled) return;

      onTileClick?.(x, y);

      // Check if this is a possible move destination
      if (movesFrom && selectedSquare) {
        const isValidMove = movesFrom.to.some(([mx, my]) => mx === x && my === y);
        if (isValidMove) {
          onMove?.(selectedSquare, [x, y]);
          setSelectedSquare(null);
          setMovesFrom(null);
          return;
        }
      }

      // Check if there's a piece on this square belonging to the current player
      const piece = gameState.pieces.find(
        (p) => p.x === x && p.y === y && p.owner === playerNum
      );

      if (piece && gameState.toMove === playerNum) {
        setSelectedSquare([x, y]);
        onRequestMoves?.(x, y);
      } else {
        setSelectedSquare(null);
        setMovesFrom(null);
      }
    },
    [
      disabled,
      movesFrom,
      selectedSquare,
      gameState.pieces,
      gameState.toMove,
      playerNum,
      onTileClick,
      onMove,
      onRequestMoves,
      setSelectedSquare,
      setMovesFrom,
    ]
  );

  const isHighlightedFrom = (x: number, y: number) => {
    if (lastTurn && lastTurn.from[0] === x && lastTurn.from[1] === y) return true;
    if (selectedSquare && selectedSquare[0] === x && selectedSquare[1] === y) return true;
    return false;
  };

  const isHighlightedTo = (x: number, y: number) => {
    if (lastTurn && lastTurn.to[0] === x && lastTurn.to[1] === y) return true;
    return false;
  };

  const isPossibleMove = (x: number, y: number) => {
    if (!movesFrom) return false;
    return movesFrom.to.some(([mx, my]) => mx === x && my === y);
  };

  const isInCheck = (x: number, y: number) => {
    if (!inCheckKings) return false;
    return inCheckKings.some((k) => k.x === x && k.y === y);
  };

  return (
    // Invisible container for centering
    <div
      className="flex items-center justify-center"
      style={{ width: MAX_BOARD_SIZE_PX, height: MAX_BOARD_SIZE_PX }}
    >
      {/* Border wrapper - separate from tile container */}
      <div className="border-4 border-[#2d3436] shadow-[8px_8px_0px_#2d3436]">
        {/* Tile container - no border, exact size for tiles */}
        <div
          className="relative"
          style={{ width: boardWidthPx, height: boardHeightPx }}
        >
          {/* Tiles */}
        {gameState.tiles.map((tile) => {
          const displayX = flipped ? width - 1 - tile.x : tile.x;
          const displayY = flipped ? tile.y : height - 1 - tile.y;

          let backgroundColor = tile.tileType === 'w' ? COLORS.SQUARE_LIGHT : COLORS.SQUARE_DARK;
          if (tile.tileType === 'x') {
            backgroundColor = COLORS.DISABLED;
          } else if (isInCheck(tile.x, tile.y)) {
            backgroundColor = COLORS.HIGHLIGHT_CHECK;
          } else if (isHighlightedFrom(tile.x, tile.y)) {
            backgroundColor = COLORS.HIGHLIGHT_FROM;
          } else if (isHighlightedTo(tile.x, tile.y)) {
            backgroundColor = COLORS.HIGHLIGHT_TO;
          }

          return (
            <div
              key={`${tile.x}-${tile.y}`}
              className="absolute cursor-pointer transition-colors hover:brightness-110"
              style={{
                left: displayX * tileSize,
                top: displayY * tileSize,
                width: tileSize,
                height: tileSize,
                backgroundColor,
              }}
              onClick={() => handleTileClick(tile.x, tile.y)}
            >
              {isPossibleMove(tile.x, tile.y) && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-1/3 h-1/3 rounded-full opacity-60"
                    style={{ backgroundColor: COLORS.HIGHLIGHT_POSSIBLE_TO }}
                  />
                </div>
              )}
            </div>
          );
        })}

        {/* Pieces */}
        {gameState.pieces.map((piece, index) => {
          const displayX = flipped ? width - 1 - piece.x : piece.x;
          const displayY = flipped ? piece.y : height - 1 - piece.y;
          const color = piece.owner === 0 ? 'white' : 'black';

          return (
            <div
              key={`piece-${index}-${piece.x}-${piece.y}`}
              className="absolute pointer-events-none flex items-center justify-center"
              style={{
                left: displayX * tileSize,
                top: displayY * tileSize,
                width: tileSize,
                height: tileSize,
              }}
            >
              <img
                src={`/images/chess_pieces/${color}/${piece.pieceType.toLowerCase()}.svg`}
                alt={`${color} ${piece.pieceType}`}
                className="w-[85%] h-[85%] object-contain drop-shadow-md"
                draggable={false}
              />
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}
