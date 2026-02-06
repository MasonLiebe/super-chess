import { memo } from 'react';
import { COLORS } from '../../lib/constants';
import type { GameState } from '../../types/chess';

interface BoardThumbnailProps {
  gameState: GameState;
  size?: number;
}

export const BoardThumbnail = memo(function BoardThumbnail({
  gameState,
  size = 150,
}: BoardThumbnailProps) {
  const { width, height } = gameState;
  const maxDimension = Math.max(width, height);
  const tileSize = Math.floor(size / maxDimension);
  const boardWidthPx = tileSize * width;
  const boardHeightPx = tileSize * height;

  return (
    <div
      className="flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <div className="border-2 border-[var(--border-color)]">
        <div
          className="relative"
          style={{ width: boardWidthPx, height: boardHeightPx }}
        >
          {gameState.tiles.map((tile) => {
            const displayX = tile.x;
            const displayY = height - 1 - tile.y;
            const isLightSquare = (tile.x + tile.y) % 2 === 1;
            let backgroundColor = isLightSquare ? COLORS.SQUARE_LIGHT : COLORS.SQUARE_DARK;
            if (tile.tileType === 'x') {
              backgroundColor = COLORS.DISABLED;
            }

            return (
              <div
                key={`${tile.x}-${tile.y}`}
                className="absolute"
                style={{
                  left: displayX * tileSize,
                  top: displayY * tileSize,
                  width: tileSize,
                  height: tileSize,
                  backgroundColor,
                }}
              />
            );
          })}

          {gameState.pieces.map((piece, index) => {
            const displayX = piece.x;
            const displayY = height - 1 - piece.y;
            const color = piece.owner === 0 ? 'white' : 'black';

            return (
              <div
                key={`piece-${index}`}
                className="absolute flex items-center justify-center"
                style={{
                  left: displayX * tileSize,
                  top: displayY * tileSize,
                  width: tileSize,
                  height: tileSize,
                }}
              >
                <img
                  src={`/images/chess_pieces/${color}/${piece.pieceType.toLowerCase()}.svg`}
                  alt=""
                  className="w-[85%] h-[85%] object-contain"
                  draggable={false}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});
