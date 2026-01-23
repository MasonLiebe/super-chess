import { useCallback, useRef } from 'react';

interface PieceSelectorProps {
  pieces: string[];
  selectedPiece: string;
  onSelect: (piece: string) => void;
  owner: 0 | 1;
}

const PIECE_LABELS: Record<string, string> = {
  k: 'King',
  q: 'Queen',
  r: 'Rook',
  b: 'Bishop',
  n: 'Knight',
  p: 'Pawn',
};

export function PieceSelector({ pieces, selectedPiece, onSelect, owner }: PieceSelectorProps) {
  const color = owner === 0 ? 'white' : 'black';
  const dragImageRefs = useRef<Map<string, HTMLImageElement>>(new Map());

  const handleDragStart = useCallback((e: React.DragEvent, piece: string) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ pieceType: piece, owner }));
    e.dataTransfer.effectAllowed = 'copy';

    // Use the piece image as drag image
    const img = dragImageRefs.current.get(piece);
    if (img) {
      e.dataTransfer.setDragImage(img, 25, 25);
    }
  }, [owner]);

  return (
    <div className="grid grid-cols-3 gap-2">
      {pieces.map((piece) => (
        <button
          key={piece}
          onClick={() => onSelect(piece)}
          draggable
          onDragStart={(e) => handleDragStart(e, piece)}
          className={`aspect-square border-2 border-[#2d3436] p-1 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing ${
            selectedPiece === piece
              ? 'bg-[#4ecdc4]'
              : 'bg-white hover:bg-[#f8f9fa]'
          }`}
          title={`${PIECE_LABELS[piece] || piece.toUpperCase()} - Drag to board`}
        >
          <img
            ref={(el) => {
              if (el) dragImageRefs.current.set(piece, el);
            }}
            src={`/images/chess_pieces/${color}/${piece}.svg`}
            alt={PIECE_LABELS[piece] || piece}
            className="w-full h-full object-contain pointer-events-none"
          />
        </button>
      ))}
    </div>
  );
}
