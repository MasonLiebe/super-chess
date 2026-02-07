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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 lg:p-4">
      <div className="bg-[var(--bg-card)] border-2 lg:border-4 border-[var(--border-color)] shadow-[4px_4px_0px_var(--shadow-color)] lg:shadow-[8px_8px_0px_var(--shadow-color)] max-w-sm w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-2 lg:p-4 border-b-2 lg:border-b-4 border-[var(--border-color)]">
          <h2 className="text-base lg:text-xl font-black text-[var(--text-primary)]">Select Piece Icon</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 lg:w-10 lg:h-10 bg-[#ff6b6b] border-2 border-[var(--border-color)] font-bold text-lg lg:text-xl text-[var(--color-dark)] hover:bg-red-400 flex items-center justify-center"
          >
            ×
          </button>
        </div>

        <div className="p-3 lg:p-4">
          {availableIcons.length === 0 ? (
            <div className="text-center py-6 lg:py-8">
              <p className="text-sm lg:text-base text-[var(--text-secondary)] font-medium">
                All custom pieces are in use ({MAX_CUSTOM_PIECES})
              </p>
              <p className="text-xs lg:text-sm text-[var(--text-secondary)] mt-2">
                Delete an existing piece to create a new one.
              </p>
            </div>
          ) : (
            <>
              <p className="text-xs lg:text-sm text-[var(--text-secondary)] mb-3 lg:mb-4 text-center">
                Choose an icon for your custom piece!
              </p>

              {/* Icon grid - 3 columns for 9 icons */}
              <div className="grid grid-cols-3 gap-2 lg:gap-3 justify-items-center">
                {availableIcons.map((icon) => (
                  <button
                    key={icon}
                    onClick={() => onSelect(icon)}
                    className="w-14 h-14 lg:w-16 lg:h-16 border-2 border-[var(--border-color)] bg-[var(--bg-card)] hover:bg-[#4ecdc4] transition-colors p-1.5 lg:p-2 shadow-[2px_2px_0px_var(--shadow-color)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex flex-col items-center justify-center"
                    title={PIECE_LABELS[icon] || icon.toUpperCase()}
                  >
                    <img
                      src={`/images/chess_pieces/white/${icon}.svg`}
                      alt={PIECE_LABELS[icon] || icon}
                      className="w-8 h-8 lg:w-10 lg:h-10 object-contain"
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
