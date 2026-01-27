import { CUSTOM_PIECE_CHARS } from '../../stores/editorStore';

interface IconSelectorModalProps {
  usedIcons: string[];
  onSelect: (icon: string) => void;
  onClose: () => void;
}

// Max custom pieces matches available icons
const MAX_CUSTOM_PIECES = CUSTOM_PIECE_CHARS.length;

// Labels for custom piece icons
const PIECE_LABELS: Record<string, string> = {
  a: 'Archbishop',
  c: 'Chancellor',
  d: 'Dragon',
  e: 'Eagle',
  f: 'Falcon',
  g: 'Guard',
  u: 'Unicorn',
  y: 'Yawn',
  z: 'Amazon',
};

export function IconSelectorModal({ usedIcons, onSelect, onClose }: IconSelectorModalProps) {
  // Filter out already used icons
  const availableIcons = CUSTOM_PIECE_CHARS.filter(
    (icon) => !usedIcons.includes(icon)
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white border-4 border-[#2d3436] shadow-[8px_8px_0px_#2d3436] max-w-sm w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b-4 border-[#2d3436]">
          <h2 className="text-xl font-black text-[#2d3436]">Select Piece Icon</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-[#ff6b6b] border-2 border-[#2d3436] font-bold text-xl hover:bg-red-400"
          >
            ×
          </button>
        </div>

        <div className="p-4">
          {availableIcons.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-[#636e72] font-medium">
                All custom pieces are in use ({MAX_CUSTOM_PIECES})
              </p>
              <p className="text-sm text-[#636e72] mt-2">
                Delete an existing piece to create a new one.
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-[#636e72] mb-4 text-center">
                Choose an icon for your custom piece!
              </p>

              {/* Icon grid - 3 columns for 9 icons */}
              <div className="grid grid-cols-3 gap-3 justify-items-center">
                {availableIcons.map((icon) => (
                  <button
                    key={icon}
                    onClick={() => onSelect(icon)}
                    className="w-16 h-16 border-2 border-[#2d3436] bg-white hover:bg-[#4ecdc4] transition-colors p-2 shadow-[2px_2px_0px_#2d3436] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex flex-col items-center justify-center"
                    title={PIECE_LABELS[icon] || icon.toUpperCase()}
                  >
                    <img
                      src={`/images/chess_pieces/white/${icon}.svg`}
                      alt={PIECE_LABELS[icon] || icon}
                      className="w-10 h-10 object-contain"
                    />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export { MAX_CUSTOM_PIECES };
