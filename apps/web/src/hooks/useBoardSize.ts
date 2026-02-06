import { useState, useEffect, useMemo } from 'react';

const MAX_BOARD_SIZE_PX = 560;
const BOARD_PADDING = 32; // p-4 on page wrapper = 16px each side
const BOARD_CHROME = 24; // border-4 (8px each side = 16px) + shadow (8px)

export function useBoardSize(boardWidth: number, boardHeight: number) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return useMemo(() => {
    const availableWidth = windowWidth - BOARD_PADDING - BOARD_CHROME;
    const maxSize = Math.min(availableWidth, MAX_BOARD_SIZE_PX);
    const maxDimension = Math.max(boardWidth, boardHeight);
    const tileSize = Math.max(Math.floor(maxSize / maxDimension), 1);
    return {
      maxBoardSizePx: tileSize * maxDimension,
      tileSize,
      boardWidthPx: tileSize * boardWidth,
      boardHeightPx: tileSize * boardHeight,
    };
  }, [windowWidth, boardWidth, boardHeight]);
}
