import { useRef, useCallback, useState } from 'react';

interface UseTouchDragConfig {
  boardRef: React.RefObject<HTMLDivElement | null>;
  tileSize: number;
  boardWidth: number;
  boardHeight: number;
  flipped: boolean;
  disabled: boolean;
  playerNum: number;
  toMove: number;
  pieces: ReadonlyArray<{ owner: number; x: number; y: number; pieceType: string }>;
  onDragStart: (pieceX: number, pieceY: number) => void;
  onDrop: (fromX: number, fromY: number, toX: number, toY: number) => void;
  onDragCancel: () => void;
}

interface DragState {
  isDragging: boolean;
  pieceType: string;
  owner: number;
  fromX: number;
  fromY: number;
  startClientX: number;
  startClientY: number;
}

const DRAG_THRESHOLD = 5; // pixels before committing to a drag

export function useTouchDrag(config: UseTouchDragConfig) {
  const dragState = useRef<DragState | null>(null);
  const ghostRef = useRef<HTMLDivElement | null>(null);
  const [touchDragFrom, setTouchDragFrom] = useState<[number, number] | null>(null);

  const clientToBoard = useCallback(
    (clientX: number, clientY: number): [number, number] | null => {
      const board = config.boardRef.current;
      if (!board) return null;
      const rect = board.getBoundingClientRect();
      const displayX = Math.floor((clientX - rect.left) / config.tileSize);
      const displayY = Math.floor((clientY - rect.top) / config.tileSize);
      const boardX = config.flipped ? config.boardWidth - 1 - displayX : displayX;
      const boardY = config.flipped ? displayY : config.boardHeight - 1 - displayY;
      if (boardX < 0 || boardX >= config.boardWidth || boardY < 0 || boardY >= config.boardHeight) {
        return null;
      }
      return [boardX, boardY];
    },
    [config.boardRef, config.tileSize, config.boardWidth, config.boardHeight, config.flipped]
  );

  const createGhost = useCallback(
    (clientX: number, clientY: number, pieceType: string, owner: number) => {
      const ghost = document.createElement('div');
      ghost.style.position = 'fixed';
      ghost.style.pointerEvents = 'none';
      ghost.style.zIndex = '9999';
      const size = config.tileSize * 1.2;
      ghost.style.width = `${size}px`;
      ghost.style.height = `${size}px`;
      ghost.style.transform = 'translate(-50%, -50%)';
      ghost.style.left = `${clientX}px`;
      ghost.style.top = `${clientY}px`;

      const img = document.createElement('img');
      const color = owner === 0 ? 'white' : 'black';
      img.src = `/images/chess_pieces/${color}/${pieceType.toLowerCase()}.svg`;
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.filter = 'drop-shadow(2px 4px 6px rgba(0,0,0,0.4))';
      ghost.appendChild(img);
      document.body.appendChild(ghost);
      ghostRef.current = ghost;
    },
    [config.tileSize]
  );

  const updateGhost = useCallback((clientX: number, clientY: number) => {
    if (ghostRef.current) {
      ghostRef.current.style.left = `${clientX}px`;
      ghostRef.current.style.top = `${clientY}px`;
    }
  }, []);

  const removeGhost = useCallback(() => {
    if (ghostRef.current) {
      ghostRef.current.remove();
      ghostRef.current = null;
    }
  }, []);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (config.disabled || config.toMove !== config.playerNum) return;

      const touch = e.touches[0];
      const coords = clientToBoard(touch.clientX, touch.clientY);
      if (!coords) return;

      const [bx, by] = coords;
      const piece = config.pieces.find(
        (p) => p.x === bx && p.y === by && p.owner === config.playerNum
      );
      if (!piece) return;

      dragState.current = {
        isDragging: false,
        pieceType: piece.pieceType,
        owner: piece.owner,
        fromX: bx,
        fromY: by,
        startClientX: touch.clientX,
        startClientY: touch.clientY,
      };
    },
    [config.disabled, config.playerNum, config.toMove, config.pieces, clientToBoard]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      const state = dragState.current;
      if (!state) return;

      const touch = e.touches[0];

      if (!state.isDragging) {
        const dx = touch.clientX - state.startClientX;
        const dy = touch.clientY - state.startClientY;
        if (Math.abs(dx) + Math.abs(dy) < DRAG_THRESHOLD) return;

        // Commit to drag
        state.isDragging = true;
        setTouchDragFrom([state.fromX, state.fromY]);
        config.onDragStart(state.fromX, state.fromY);
        createGhost(touch.clientX, touch.clientY, state.pieceType, state.owner);
      }

      // Prevent scrolling once dragging
      e.preventDefault();
      updateGhost(touch.clientX, touch.clientY);
    },
    [config.onDragStart, createGhost, updateGhost]
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const state = dragState.current;
      if (!state) return;

      dragState.current = null;
      removeGhost();

      if (state.isDragging) {
        // Prevent the synthetic click from firing after a drag
        e.preventDefault();

        const touch = e.changedTouches[0];
        const coords = clientToBoard(touch.clientX, touch.clientY);
        if (coords) {
          config.onDrop(state.fromX, state.fromY, coords[0], coords[1]);
        } else {
          config.onDragCancel();
        }
        setTouchDragFrom(null);
      }
      // If not dragging, let the click handler fire naturally for tap-to-move
    },
    [clientToBoard, config.onDrop, config.onDragCancel, removeGhost]
  );

  return {
    touchHandlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
    touchDragFrom,
  };
}
