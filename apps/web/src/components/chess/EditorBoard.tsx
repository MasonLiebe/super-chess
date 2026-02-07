import { useCallback, useState, useRef } from 'react';
import { useEditorStore } from '../../stores/editorStore';
import { useBoardSize, type ReservedHeight } from '../../hooks/useBoardSize';
import { COLORS } from '../../lib/constants';

interface EditorBoardProps {
  reservedHeight?: number | ReservedHeight;
}

export function EditorBoard({ reservedHeight }: EditorBoardProps) {
  const {
    width,
    height,
    tiles,
    pieces,
    currentTool,
    toggleTile,
    placePiece,
    removePiece,
  } = useEditorStore();

  // Track painting state (mouse and touch)
  const [isPainting, setIsPainting] = useState(false);
  const [paintedSquares, setPaintedSquares] = useState<Set<string>>(new Set());
  const boardRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
  }, []);

  // Responsive board sizing
  const { maxBoardSizePx, tileSize, boardWidthPx, boardHeightPx } = useBoardSize(width, height, reservedHeight);

  // Get board coordinates from client position
  const getBoardCoords = useCallback((clientX: number, clientY: number) => {
    if (!boardRef.current) return null;
    const rect = boardRef.current.getBoundingClientRect();
    const x = Math.floor((clientX - rect.left) / tileSize);
    const y = height - 1 - Math.floor((clientY - rect.top) / tileSize);
    if (x < 0 || x >= width || y < 0 || y >= height) return null;
    return { x, y };
  }, [tileSize, width, height]);

  // Apply paint action at coordinates
  const applyPaint = useCallback((x: number, y: number) => {
    if (currentTool === 'toggleTile') {
      toggleTile(x, y);
    } else {
      placePiece(x, y);
    }
  }, [currentTool, toggleTile, placePiece]);

  // Mouse down - start painting
  const handleMouseDown = useCallback((x: number, y: number, e: React.MouseEvent) => {
    if (e.button !== 0) return;
    applyPaint(x, y);
    setIsPainting(true);
    setPaintedSquares(new Set([`${x},${y}`]));
  }, [applyPaint]);

  // Mouse move - continue painting
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPainting) return;
    const coords = getBoardCoords(e.clientX, e.clientY);
    if (!coords) return;
    const key = `${coords.x},${coords.y}`;
    if (!paintedSquares.has(key)) {
      applyPaint(coords.x, coords.y);
      setPaintedSquares((prev) => new Set(prev).add(key));
    }
  }, [isPainting, getBoardCoords, applyPaint, paintedSquares]);

  const stopPainting = useCallback(() => {
    setIsPainting(false);
    setPaintedSquares(new Set());
  }, []);

  // Touch start - start painting
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    const coords = getBoardCoords(touch.clientX, touch.clientY);
    if (!coords) return;
    applyPaint(coords.x, coords.y);
    setIsPainting(true);
    setPaintedSquares(new Set([`${coords.x},${coords.y}`]));
  }, [getBoardCoords, applyPaint]);

  // Touch move - continue painting
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isPainting) return;
    e.preventDefault();
    const touch = e.touches[0];
    const coords = getBoardCoords(touch.clientX, touch.clientY);
    if (!coords) return;
    const key = `${coords.x},${coords.y}`;
    if (!paintedSquares.has(key)) {
      applyPaint(coords.x, coords.y);
      setPaintedSquares((prev) => new Set(prev).add(key));
    }
  }, [isPainting, getBoardCoords, applyPaint, paintedSquares]);

  // Handle drag over for dropping pieces from side panel
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }, []);

  // Handle drop from side panel
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('application/json');
    if (!data) return;

    try {
      const { pieceType, owner } = JSON.parse(data);
      const coords = getBoardCoords(e.clientX, e.clientY);
      if (!coords) return;

      const store = useEditorStore.getState();
      const prevType = store.selectedPieceType;
      const prevOwner = store.selectedOwner;

      store.setSelectedPieceType(pieceType);
      store.setSelectedOwner(owner);
      store.placePiece(coords.x, coords.y);

      store.setSelectedPieceType(prevType);
      store.setSelectedOwner(prevOwner);
    } catch {
      // Invalid drop data
    }
  }, [getBoardCoords]);

  return (
    // Invisible container for centering
    <div
      className="flex items-center justify-center mx-auto"
      style={{ width: maxBoardSizePx, height: maxBoardSizePx }}
      onContextMenu={handleContextMenu}
      onMouseMove={handleMouseMove}
      onMouseUp={stopPainting}
      onMouseLeave={stopPainting}
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
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={stopPainting}
        >
        {/* Tiles */}
        {tiles.map((tile) => {
          const displayX = tile.x;
          const displayY = height - 1 - tile.y;

          const isLightSquare = (tile.x + tile.y) % 2 === 1;
          let backgroundColor: string;
          if (tile.tileType === 'x') {
            backgroundColor = COLORS.DISABLED;
          } else {
            backgroundColor = isLightSquare ? COLORS.SQUARE_LIGHT : COLORS.SQUARE_DARK;
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
              onMouseDown={(e) => handleMouseDown(tile.x, tile.y, e)}
              onContextMenu={(e) => {
                e.preventDefault();
                removePiece(tile.x, tile.y);
              }}
            >
              {/* Coordinate labels for edges */}
              {tile.y === 0 && (
                <span className="absolute bottom-1 right-1 text-[10px] font-bold opacity-50 pointer-events-none">
                  {String.fromCharCode(97 + tile.x)}
                </span>
              )}
              {tile.x === 0 && (
                <span className="absolute top-1 left-1 text-[10px] font-bold opacity-50 pointer-events-none">
                  {tile.y + 1}
                </span>
              )}
            </div>
          );
        })}

        {/* Pieces */}
        {pieces.map((piece, index) => {
          const displayX = piece.x;
          const displayY = height - 1 - piece.y;
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

        {/* Empty board message */}
        {pieces.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="px-4 py-2 border-2 border-[var(--border-color)]" style={{ backgroundColor: 'color-mix(in srgb, var(--bg-card) 90%, transparent)' }}>
              <p className="text-[var(--text-secondary)] font-medium">Click to place pieces</p>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
