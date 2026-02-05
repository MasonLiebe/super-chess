import { useCallback, useState, useRef } from 'react';
import { useEditorStore } from '../../stores/editorStore';
import { COLORS } from '../../lib/constants';

const MAX_BOARD_SIZE_PX = 560; // Maximum board size in pixels

export function EditorBoard() {
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

  // Track mouse state for painting
  const [isPainting, setIsPainting] = useState(false);
  const [paintedSquares, setPaintedSquares] = useState<Set<string>>(new Set());
  const boardRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
  }, []);

  // Calculate tile size
  const maxDimension = Math.max(width, height);
  const tileSize = Math.floor(MAX_BOARD_SIZE_PX / maxDimension);
  const boardWidthPx = tileSize * width;
  const boardHeightPx = tileSize * height;

  // Get board coordinates from mouse position
  const getBoardCoords = useCallback((clientX: number, clientY: number) => {
    if (!boardRef.current) return null;
    const rect = boardRef.current.getBoundingClientRect();
    const x = Math.floor((clientX - rect.left) / tileSize);
    const y = height - 1 - Math.floor((clientY - rect.top) / tileSize);
    if (x < 0 || x >= width || y < 0 || y >= height) return null;
    return { x, y };
  }, [tileSize, width, height]);

  // Mouse down - start painting
  const handleMouseDown = useCallback((x: number, y: number, e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left click

    if (currentTool === 'toggleTile') {
      toggleTile(x, y);
      setIsPainting(true);
      setPaintedSquares(new Set([`${x},${y}`]));
      return;
    }

    // Place piece and begin paint mode
    placePiece(x, y);
    setIsPainting(true);
    setPaintedSquares(new Set([`${x},${y}`]));
  }, [currentTool, placePiece, toggleTile]);

  // Mouse move - paint pieces or toggle tiles
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPainting) return;

    const coords = getBoardCoords(e.clientX, e.clientY);
    if (!coords) return;

    const key = `${coords.x},${coords.y}`;
    if (!paintedSquares.has(key)) {
      if (currentTool === 'toggleTile') {
        toggleTile(coords.x, coords.y);
      } else {
        placePiece(coords.x, coords.y);
      }
      setPaintedSquares((prev) => new Set(prev).add(key));
    }
  }, [isPainting, currentTool, getBoardCoords, placePiece, toggleTile, paintedSquares]);

  // Mouse up - stop painting
  const handleMouseUp = useCallback(() => {
    setIsPainting(false);
    setPaintedSquares(new Set());
  }, []);

  // Mouse leave - cancel painting
  const handleMouseLeave = useCallback(() => {
    setIsPainting(false);
    setPaintedSquares(new Set());
  }, []);

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

      // Temporarily set the piece type and owner, place, then restore
      const store = useEditorStore.getState();
      const prevType = store.selectedPieceType;
      const prevOwner = store.selectedOwner;

      store.setSelectedPieceType(pieceType);
      store.setSelectedOwner(owner);
      store.placePiece(coords.x, coords.y);

      // Restore previous selection
      store.setSelectedPieceType(prevType);
      store.setSelectedOwner(prevOwner);
    } catch {
      // Invalid drop data
    }
  }, [getBoardCoords]);

  return (
    // Invisible container for centering
    <div
      className="flex items-center justify-center"
      style={{ width: MAX_BOARD_SIZE_PX, height: MAX_BOARD_SIZE_PX }}
      onContextMenu={handleContextMenu}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {/* Border wrapper - separate from tile container */}
      <div className="border-4 border-[#2d3436] shadow-[8px_8px_0px_#2d3436]">
        {/* Tile container - no border, exact size for tiles */}
        <div
          ref={boardRef}
          className="relative select-none"
          style={{ width: boardWidthPx, height: boardHeightPx }}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
        {/* Tiles */}
        {tiles.map((tile) => {
          const displayX = tile.x;
          const displayY = height - 1 - tile.y;

          // Compute color from coordinates for consistency
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
            <div className="bg-white/90 px-4 py-2 border-2 border-[#2d3436]">
              <p className="text-[#636e72] font-medium">Click to place pieces</p>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
