import { useCallback, useRef, useState } from 'react';
import { useGameStore } from '../../stores/gameStore';
import { useBoardSize, type ReservedHeight } from '../../hooks/useBoardSize';
import { useTouchDrag } from '../../hooks/useTouchDrag';
import { COLORS } from '../../lib/constants';
import type { GameState, Piece as PieceType, Turn } from '../../types/chess';

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
  reservedHeight?: number | ReservedHeight;
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
  reservedHeight,
}: BoardProps) {
  const { movesFrom, selectedSquare, setSelectedSquare, setMovesFrom } = useGameStore();
  const [isDragging, setIsDragging] = useState(false);
  const [dragFrom, setDragFrom] = useState<[number, number] | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  const { width, height } = gameState;

  // Responsive board sizing
  const { maxBoardSizePx, tileSize, boardWidthPx, boardHeightPx } = useBoardSize(width, height, reservedHeight);

  // Touch drag-and-drop for mobile
  const { touchHandlers, touchDragFrom } = useTouchDrag({
    boardRef,
    tileSize,
    boardWidth: width,
    boardHeight: height,
    flipped,
    disabled,
    playerNum,
    toMove: gameState.toMove,
    pieces: gameState.pieces,
    onDragStart: useCallback(
      (x: number, y: number) => {
        setSelectedSquare([x, y]);
        onRequestMoves?.(x, y);
      },
      [setSelectedSquare, onRequestMoves]
    ),
    onDrop: useCallback(
      (fromX: number, fromY: number, toX: number, toY: number) => {
        // Check if this is a valid move using the latest movesFrom from the store
        const store = useGameStore.getState();
        if (store.movesFrom) {
          const isValidMove = store.movesFrom.to.some(([mx, my]) => mx === toX && my === toY);
          if (isValidMove) {
            onMove?.([fromX, fromY], [toX, toY]);
          }
        }
        setSelectedSquare(null);
        setMovesFrom(null);
      },
      [onMove, setSelectedSquare, setMovesFrom]
    ),
    onDragCancel: useCallback(() => {
      setSelectedSquare(null);
      setMovesFrom(null);
    }, [setSelectedSquare, setMovesFrom]),
  });

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

  // Drag and drop handlers (desktop HTML5 Drag API)
  const handleDragStart = useCallback(
    (e: React.DragEvent, piece: PieceType) => {
      if (disabled || piece.owner !== playerNum || gameState.toMove !== playerNum) {
        e.preventDefault();
        return;
      }

      // Set drag data
      e.dataTransfer.setData('text/plain', JSON.stringify({ x: piece.x, y: piece.y }));
      e.dataTransfer.effectAllowed = 'move';

      // Use custom drag image (just the piece)
      const img = e.currentTarget.querySelector('img');
      if (img) {
        const dragImg = img.cloneNode(true) as HTMLImageElement;
        dragImg.style.position = 'absolute';
        dragImg.style.top = '-9999px';
        dragImg.style.left = '-9999px';
        dragImg.style.width = `${tileSize * 0.85}px`;
        dragImg.style.height = `${tileSize * 0.85}px`;
        document.body.appendChild(dragImg);
        e.dataTransfer.setDragImage(dragImg, tileSize * 0.425, tileSize * 0.425);
        requestAnimationFrame(() => document.body.removeChild(dragImg));
      }

      // Request moves for this piece
      setSelectedSquare([piece.x, piece.y]);
      setDragFrom([piece.x, piece.y]);
      setIsDragging(true);
      onRequestMoves?.(piece.x, piece.y);
    },
    [disabled, playerNum, gameState.toMove, tileSize, setSelectedSquare, onRequestMoves]
  );

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    setDragFrom(null);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, targetX: number, targetY: number) => {
      e.preventDefault();
      setIsDragging(false);
      setDragFrom(null);

      if (disabled) return;

      if (movesFrom && selectedSquare) {
        const isValidMove = movesFrom.to.some(([mx, my]) => mx === targetX && my === targetY);
        if (isValidMove) {
          onMove?.(selectedSquare, [targetX, targetY]);
        }
      }

      setSelectedSquare(null);
      setMovesFrom(null);
    },
    [disabled, movesFrom, selectedSquare, onMove, setSelectedSquare, setMovesFrom]
  );

  const isHighlightedFrom = (x: number, y: number) => {
    if (lastTurn && lastTurn.from[0] === x && lastTurn.from[1] === y) return true;
    if (selectedSquare && selectedSquare[0] === x && selectedSquare[1] === y) return true;
    if (dragFrom && dragFrom[0] === x && dragFrom[1] === y) return true;
    if (touchDragFrom && touchDragFrom[0] === x && touchDragFrom[1] === y) return true;
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
      className="flex items-center justify-center mx-auto"
      style={{ width: maxBoardSizePx, height: maxBoardSizePx }}
    >
      {/* Border wrapper - reduced shadow on mobile */}
      <div className="border-4 border-[var(--border-color)] shadow-[4px_4px_0px_var(--shadow-color)] lg:shadow-[8px_8px_0px_var(--shadow-color)]">
        {/* Tile container */}
        <div
          ref={boardRef}
          className="relative select-none"
          style={{
            width: boardWidthPx,
            height: boardHeightPx,
            touchAction: 'none',
          }}
          {...touchHandlers}
        >
          {/* Tiles */}
        {gameState.tiles.map((tile) => {
          const displayX = flipped ? width - 1 - tile.x : tile.x;
          const displayY = flipped ? tile.y : height - 1 - tile.y;

          const isLightSquare = (tile.x + tile.y) % 2 === 1;
          let backgroundColor = isLightSquare ? COLORS.SQUARE_LIGHT : COLORS.SQUARE_DARK;
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
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, tile.x, tile.y)}
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
          const canDrag = !disabled && piece.owner === playerNum && gameState.toMove === playerNum;
          const isBeingDragged =
            (isDragging && dragFrom && dragFrom[0] === piece.x && dragFrom[1] === piece.y) ||
            (touchDragFrom && touchDragFrom[0] === piece.x && touchDragFrom[1] === piece.y);

          return (
            <div
              key={`piece-${index}-${piece.x}-${piece.y}`}
              className={`absolute flex items-center justify-center ${
                canDrag ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'
              } ${isBeingDragged ? 'opacity-50' : ''}`}
              style={{
                left: displayX * tileSize,
                top: displayY * tileSize,
                width: tileSize,
                height: tileSize,
              }}
              draggable={canDrag}
              onDragStart={(e) => handleDragStart(e, piece)}
              onDragEnd={handleDragEnd}
              onClick={() => handleTileClick(piece.x, piece.y)}
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
