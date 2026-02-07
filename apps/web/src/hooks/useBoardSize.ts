import { useState, useEffect, useMemo } from 'react';

const MAX_BOARD_SIZE_PX = 560;
const BOARD_PADDING = 32; // p-4 on page wrapper = 16px each side
const BOARD_CHROME = 24; // border-4 (8px each side = 16px) + shadow (8px)
const LG_BREAKPOINT = 1024; // Tailwind lg breakpoint

export interface ReservedHeight {
  mobile: number;
  desktop: number;
}

export function useBoardSize(boardWidth: number, boardHeight: number, reservedHeight?: number | ReservedHeight) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return useMemo(() => {
    const availableWidth = windowWidth - BOARD_PADDING - BOARD_CHROME;
    let maxSize = Math.min(availableWidth, MAX_BOARD_SIZE_PX);

    // Constrain by available height
    if (reservedHeight !== undefined) {
      const reserved = typeof reservedHeight === 'number'
        ? reservedHeight
        : windowWidth >= LG_BREAKPOINT ? reservedHeight.desktop : reservedHeight.mobile;
      const availableHeight = windowHeight - reserved - BOARD_CHROME;
      maxSize = Math.min(maxSize, availableHeight);
    }

    const maxDimension = Math.max(boardWidth, boardHeight);
    const tileSize = Math.max(Math.floor(maxSize / maxDimension), 1);
    return {
      maxBoardSizePx: tileSize * maxDimension,
      tileSize,
      boardWidthPx: tileSize * boardWidth,
      boardHeightPx: tileSize * boardHeight,
    };
  }, [windowWidth, windowHeight, boardWidth, boardHeight, reservedHeight]);
}
