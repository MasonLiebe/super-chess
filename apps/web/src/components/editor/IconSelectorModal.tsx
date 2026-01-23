import { CUSTOM_PIECE_CHARS } from '../../stores/editorStore';

interface IconSelectorModalProps {
  usedIcons: string[];
  onSelect: (icon: string) => void;
  onClose: () => void;
}

const MAX_CUSTOM_PIECES = 10;

export function IconSelectorModal({ usedIcons, onSelect, onClose }: IconSelectorModalProps) {
  // Filter out standard pieces and already used icons
  const availableIcons = CUSTOM_PIECE_CHARS.filter(
    (icon) => !usedIcons.includes(icon)
  );

  const remainingSlots = MAX_CUSTOM_PIECES - usedIcons.length;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white border-4 border-[#2d3436] shadow-[8px_8px_0px_#2d3436] max-w-md w-full">
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
          {remainingSlots <= 0 ? (
            <div className="text-center py-8">
              <p className="text-[#636e72] font-medium">
                Maximum custom pieces reached ({MAX_CUSTOM_PIECES})
              </p>
              <p className="text-sm text-[#636e72] mt-2">
                Delete an existing piece to create a new one.
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-[#636e72] mb-4 text-center">
                Choose an icon for your custom piece ({remainingSlots} slot{remainingSlots !== 1 ? 's' : ''} remaining)
              </p>

              {/* Icon grid */}
              <div className="grid grid-cols-5 gap-2 max-h-80 overflow-y-auto p-1">
                {availableIcons.map((icon) => (
                  <button
                    key={icon}
                    onClick={() => onSelect(icon)}
                    className="aspect-square border-2 border-[#2d3436] bg-white hover:bg-[#4ecdc4] transition-colors p-2 shadow-[2px_2px_0px_#2d3436] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                  >
                    <img
                      src={`/images/chess_pieces/white/${icon}.svg`}
                      alt={icon}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>

              {availableIcons.length === 0 && (
                <p className="text-center py-8 text-[#636e72]">
                  No more icons available.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export { MAX_CUSTOM_PIECES };
