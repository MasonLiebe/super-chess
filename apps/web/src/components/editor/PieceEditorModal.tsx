import React, { useState, useCallback } from 'react';
import { useEditorStore, createEmptyMovementPattern, STANDARD_PIECES } from '../../stores/editorStore';
import type { MovementPattern, Slides } from '../../types/chess';

interface PieceEditorModalProps {
  pieceType: string;
  onClose: () => void;
}

// Slide state: 0 = off, 1 = attack only, 2 = move only, 3 = both
type SlideState = 0 | 1 | 2 | 3;

const SLIDE_DIRECTIONS = [
  { key: 'north', label: 'N', dx: 0, dy: 1 },
  { key: 'south', label: 'S', dx: 0, dy: -1 },
  { key: 'east', label: 'E', dx: 1, dy: 0 },
  { key: 'west', label: 'W', dx: -1, dy: 0 },
  { key: 'northeast', label: 'NE', dx: 1, dy: 1 },
  { key: 'northwest', label: 'NW', dx: -1, dy: 1 },
  { key: 'southeast', label: 'SE', dx: 1, dy: -1 },
  { key: 'southwest', label: 'SW', dx: -1, dy: -1 },
] as const;

// Arrow SVG components for each direction
const arrows: Record<string, React.ReactNode> = {
  north: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M12 4l-8 8h5v8h6v-8h5z" />
    </svg>
  ),
  south: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M12 20l8-8h-5V4H9v8H4z" />
    </svg>
  ),
  east: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M20 12l-8-8v5H4v6h8v5z" />
    </svg>
  ),
  west: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M4 12l8 8v-5h8V9h-8V4z" />
    </svg>
  ),
  northeast: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M6 18L18 6M18 6v10M18 6H8" strokeWidth="3" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  northwest: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M18 18L6 6M6 6v10M6 6h10" strokeWidth="3" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  southeast: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M6 6l12 12M18 18V8M18 18H8" strokeWidth="3" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  southwest: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M18 6L6 18M6 18V8M6 18h10" strokeWidth="3" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

// Get background color based on slide state
function getSlideButtonStyle(state: SlideState): string {
  switch (state) {
    case 0: return 'bg-[var(--bg-card)] text-[var(--text-primary)]';
    case 1: return 'bg-red-400 text-white';
    case 2: return 'bg-green-500 text-white';
    case 3: return 'bg-purple-500 text-white';
  }
}

export function PieceEditorModal({ pieceType, onClose }: PieceEditorModalProps) {
  const { movementPatterns, setMovementPattern } = useEditorStore();

  const isStandard = STANDARD_PIECES.includes(pieceType as typeof STANDARD_PIECES[number]);
  const existingPattern = movementPatterns[pieceType];

  const [pattern, setPattern] = useState<MovementPattern>(
    existingPattern || createEmptyMovementPattern()
  );
  const [jumpAttackEnabled, setJumpAttackEnabled] = useState(true);
  const [jumpMoveEnabled, setJumpMoveEnabled] = useState(false);
  const [gridSize, setGridSize] = useState(9);

  const centerOffset = Math.floor(gridSize / 2);

  const handleGridClick = useCallback(
    (gridX: number, gridY: number) => {
      // Convert grid position to delta from center
      const dx = gridX - centerOffset;
      const dy = centerOffset - gridY; // Flip Y so up is positive

      // Can't click center (where piece is)
      if (dx === 0 && dy === 0) return;

      // Need at least one mode enabled
      if (!jumpAttackEnabled && !jumpMoveEnabled) return;

      setPattern((prev) => {
        const newPattern = { ...prev };

        if (jumpAttackEnabled) {
          const jumps = [...prev.attackJumps];
          const idx = jumps.findIndex(([x, y]) => x === dx && y === dy);
          if (idx >= 0) {
            jumps.splice(idx, 1);
          } else {
            jumps.push([dx, dy]);
          }
          newPattern.attackJumps = jumps;
        }

        if (jumpMoveEnabled) {
          const jumps = [...prev.translateJumps];
          const idx = jumps.findIndex(([x, y]) => x === dx && y === dy);
          if (idx >= 0) {
            jumps.splice(idx, 1);
          } else {
            jumps.push([dx, dy]);
          }
          newPattern.translateJumps = jumps;
        }

        return newPattern;
      });
    },
    [jumpAttackEnabled, jumpMoveEnabled, centerOffset]
  );

  // Get current slide state for a direction (0=off, 1=attack, 2=move, 3=both)
  const getSlideState = useCallback((direction: keyof Slides): SlideState => {
    const hasAttack = pattern.attackSlides[direction];
    const hasMove = pattern.translateSlides[direction];
    if (hasAttack && hasMove) return 3;
    if (hasAttack) return 1;
    if (hasMove) return 2;
    return 0;
  }, [pattern.attackSlides, pattern.translateSlides]);

  // Cycle slide state: off -> attack -> move -> both -> off
  const cycleSlideState = useCallback((direction: keyof Slides) => {
    setPattern((prev) => {
      const currentState = getSlideState(direction);
      const nextState = ((currentState + 1) % 4) as SlideState;

      return {
        ...prev,
        attackSlides: {
          ...prev.attackSlides,
          [direction]: nextState === 1 || nextState === 3,
        },
        translateSlides: {
          ...prev.translateSlides,
          [direction]: nextState === 2 || nextState === 3,
        },
      };
    });
  }, [getSlideState]);

  const handleSave = useCallback(() => {
    setMovementPattern(pieceType, pattern);
    onClose();
  }, [pieceType, pattern, setMovementPattern, onClose]);

  const handleReset = useCallback(() => {
    setPattern(createEmptyMovementPattern());
  }, []);

  // Check if a cell has a jump defined
  const hasAttackJump = (dx: number, dy: number) =>
    pattern.attackJumps.some(([x, y]) => x === dx && y === dy);
  const hasTranslateJump = (dx: number, dy: number) =>
    pattern.translateJumps.some(([x, y]) => x === dx && y === dy);

  // Generate slide path cells for visualization
  const getSlideCells = (isAttack: boolean) => {
    const slides = isAttack ? pattern.attackSlides : pattern.translateSlides;
    const cells: [number, number][] = [];

    SLIDE_DIRECTIONS.forEach(({ key, dx, dy }) => {
      if (slides[key as keyof Slides]) {
        for (let i = 1; i < centerOffset + 1; i++) {
          cells.push([centerOffset + dx * i, centerOffset - dy * i]);
        }
      }
    });

    return cells;
  };

  const attackSlideCells = getSlideCells(true);
  const translateSlideCells = getSlideCells(false);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--bg-card)] border-4 border-[var(--border-color)] shadow-[8px_8px_0px_var(--shadow-color)] max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b-4 border-[var(--border-color)]">
          <div className="flex items-center gap-4">
            <img
              src={`/images/chess_pieces/white/${pieceType}.svg`}
              alt={pieceType}
              className="w-12 h-12"
            />
            <h2 className="text-xl font-black text-[var(--text-primary)]">
              {isStandard ? `Edit ${pieceType.toUpperCase()} (Standard)` : `Custom Piece: ${pieceType.toUpperCase()}`}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-[#ff6b6b] border-2 border-[var(--border-color)] font-bold text-xl text-[var(--color-dark)] hover:bg-red-400"
          >
            ×
          </button>
        </div>

        <div className="p-4 flex flex-col items-center">
          {/* Content wrapper to constrain width */}
          <div className="w-fit">
            {/* Main row: Grid section + Controls side by side */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left - Grid section */}
              <div className="flex-shrink-0" style={{ width: 360 }}>
                {/* Slider - full width above grid */}
                <div className="mb-3 flex items-center gap-3 w-full">
                  <label className="text-sm font-medium text-[var(--text-secondary)] whitespace-nowrap">
                    Grid: {gridSize}×{gridSize}
                  </label>
                  <input
                    type="range"
                    min={5}
                    max={15}
                    step={2}
                    value={gridSize}
                    onChange={(e) => setGridSize(Number(e.target.value))}
                    className="flex-1"
                  />
                </div>

                {/* Movement Grid - Fixed 360px container, cells resize to fit */}
                <div
                  className="grid bg-[var(--shadow-color)]"
                  style={{
                    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                    gridTemplateRows: `repeat(${gridSize}, 1fr)`,
                    gap: 2,
                    padding: 2,
                    width: 360,
                    height: 360,
                  }}
                >
                  {Array.from({ length: gridSize * gridSize }).map((_, i) => {
                    const gridX = i % gridSize;
                    const gridY = Math.floor(i / gridSize);
                    const dx = gridX - centerOffset;
                    const dy = centerOffset - gridY;
                    const isCenter = dx === 0 && dy === 0;

                    const hasAttack = hasAttackJump(dx, dy);
                    const hasTranslate = hasTranslateJump(dx, dy);
                    const isAttackSlide = attackSlideCells.some(([x, y]) => x === gridX && y === gridY);
                    const isTranslateSlide = translateSlideCells.some(([x, y]) => x === gridX && y === gridY);

                    let bgColor = 'bg-[var(--bg-card)]';
                    if (isCenter) {
                      bgColor = 'bg-[#ffe66d]';
                    } else if (hasAttack && hasTranslate) {
                      bgColor = 'bg-purple-400';
                    } else if (hasAttack) {
                      bgColor = 'bg-red-400';
                    } else if (hasTranslate) {
                      bgColor = 'bg-green-400';
                    } else if (isAttackSlide && isTranslateSlide) {
                      bgColor = 'bg-purple-200';
                    } else if (isAttackSlide) {
                      bgColor = 'bg-red-200';
                    } else if (isTranslateSlide) {
                      bgColor = 'bg-green-200';
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => handleGridClick(gridX, gridY)}
                        disabled={isCenter}
                        className={`${bgColor} ${
                          isCenter ? 'cursor-default' : 'hover:brightness-90 cursor-pointer'
                        } flex items-center justify-center text-xs font-bold`}
                      >
                        {isCenter && (
                          <img
                            src={`/images/chess_pieces/white/${pieceType}.svg`}
                            alt={pieceType}
                            className="w-full h-full p-0.5"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Grid Legend */}
                <div className="mt-3 flex flex-wrap justify-center gap-3 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-red-400 border border-[var(--border-color)]" />
                    <span>Attack</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-400 border border-[var(--border-color)]" />
                    <span>Move</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-purple-400 border border-[var(--border-color)]" />
                    <span>Both</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-red-200 border border-[var(--border-color)]" />
                    <span>Slide (A)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-200 border border-[var(--border-color)]" />
                    <span>Slide (M)</span>
                  </div>
                </div>

                {/* Tips + Buttons row under the grid */}
                <div className="mt-4 flex gap-3 items-stretch">
                  {/* Tips - retroUI styled */}
                  <div className="flex-1 bg-[#ffe66d] border-2 border-[var(--border-color)] shadow-[3px_3px_0px_var(--shadow-color)] px-3 py-2">
                    <p className="text-xs text-[var(--color-dark)]">
                      <span className="font-bold">Jump</span> = Jump to a square (Knight Move)<br />
                      <span className="font-bold">Slide</span> = Slide along a line until blocked<br />
                      <span className="font-bold">Attack</span> = Capture a piece at a square<br />
                      <span className="font-bold">Move</span> = Move to an empty square
                    </p>
                  </div>

                  {/* Stacked buttons */}
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 font-bold text-sm text-[var(--color-dark)] border-2 border-[var(--border-color)] bg-[#4ecdc4] shadow-[3px_3px_0px_var(--shadow-color)]
                        transition-all duration-100 active:translate-x-[3px] active:translate-y-[3px] active:shadow-none
                        hover:brightness-105"
                    >
                      SAVE
                    </button>
                    <button
                      onClick={handleReset}
                      className="px-4 py-2 font-bold text-sm border-2 border-[var(--border-color)] bg-[var(--bg-card)] shadow-[3px_3px_0px_var(--shadow-color)]
                        transition-all duration-100 active:translate-x-[3px] active:translate-y-[3px] active:shadow-none
                        hover:bg-[var(--bg-card-hover)]"
                    >
                      RESET
                    </button>
                  </div>
                </div>
              </div>

              {/* Right - Controls */}
              <div className="w-56 space-y-4">
                {/* Tool Selection */}
                <div className="bg-[var(--bg-card-hover)] border-2 border-[var(--border-color)] p-4">
                  <h3 className="font-bold text-[var(--text-primary)] mb-1 text-center">JUMP MOVES</h3>
                  <p className="text-xs text-[var(--text-secondary)] text-center mb-3">Toggle modes, then click squares on the grid</p>
                  <div className="space-y-2">
                    <button
                      onClick={() => setJumpAttackEnabled(!jumpAttackEnabled)}
                      className={`w-full p-2 text-center text-sm font-medium border-2 border-[var(--border-color)] transition-colors ${
                        jumpAttackEnabled && jumpMoveEnabled
                          ? 'bg-purple-500 text-white'
                          : jumpAttackEnabled
                          ? 'bg-red-400 text-white'
                          : 'bg-[var(--bg-card)]'
                      }`}
                    >
                      Attack {jumpAttackEnabled ? '✓' : ''}
                    </button>
                    <button
                      onClick={() => setJumpMoveEnabled(!jumpMoveEnabled)}
                      className={`w-full p-2 text-center text-sm font-medium border-2 border-[var(--border-color)] transition-colors ${
                        jumpAttackEnabled && jumpMoveEnabled
                          ? 'bg-purple-500 text-white'
                          : jumpMoveEnabled
                          ? 'bg-green-500 text-white'
                          : 'bg-[var(--bg-card)]'
                      }`}
                    >
                      Move {jumpMoveEnabled ? '✓' : ''}
                    </button>
                  </div>
                  {!jumpAttackEnabled && !jumpMoveEnabled && (
                    <p className="text-xs text-red-500 text-center mt-2">Enable at least one mode</p>
                  )}
                </div>

                {/* Slide Directions - 3x3 Grid */}
                <div className="bg-[var(--bg-card-hover)] border-2 border-[var(--border-color)] p-4">
                  <h3 className="font-bold text-[var(--text-primary)] mb-1 text-center">SLIDE DIRECTIONS</h3>
                  <p className="text-xs text-[var(--text-secondary)] text-center mb-3">Click arrows to cycle modes</p>
                  <div className="grid grid-cols-3 gap-1.5 mx-auto" style={{ width: 'fit-content' }}>
                    {/* Row 1: NW, N, NE */}
                    {(['northwest', 'north', 'northeast'] as const).map((dir) => (
                      <button
                        key={dir}
                        onClick={() => cycleSlideState(dir)}
                        className={`w-11 h-11 border-2 border-[var(--border-color)] shadow-[2px_2px_0px_var(--shadow-color)]
                          flex items-center justify-center transition-all duration-100
                          active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                          ${getSlideButtonStyle(getSlideState(dir))}`}
                        title={`${dir}: Click to cycle (Off → Attack → Move → Both)`}
                      >
                        {arrows[dir]}
                      </button>
                    ))}
                    {/* Row 2: W, Center, E */}
                    <button
                      onClick={() => cycleSlideState('west')}
                      className={`w-11 h-11 border-2 border-[var(--border-color)] shadow-[2px_2px_0px_var(--shadow-color)]
                        flex items-center justify-center transition-all duration-100
                        active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                        ${getSlideButtonStyle(getSlideState('west'))}`}
                      title="west: Click to cycle (Off → Attack → Move → Both)"
                    >
                      {arrows.west}
                    </button>
                    <div className="w-11 h-11 border-2 border-[var(--border-color)] bg-[#ffe66d] flex items-center justify-center">
                      <img
                        src={`/images/chess_pieces/white/${pieceType}.svg`}
                        alt={pieceType}
                        className="w-7 h-7"
                      />
                    </div>
                    <button
                      onClick={() => cycleSlideState('east')}
                      className={`w-11 h-11 border-2 border-[var(--border-color)] shadow-[2px_2px_0px_var(--shadow-color)]
                        flex items-center justify-center transition-all duration-100
                        active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                        ${getSlideButtonStyle(getSlideState('east'))}`}
                      title="east: Click to cycle (Off → Attack → Move → Both)"
                    >
                      {arrows.east}
                    </button>
                    {/* Row 3: SW, S, SE */}
                    {(['southwest', 'south', 'southeast'] as const).map((dir) => (
                      <button
                        key={dir}
                        onClick={() => cycleSlideState(dir)}
                        className={`w-11 h-11 border-2 border-[var(--border-color)] shadow-[2px_2px_0px_var(--shadow-color)]
                          flex items-center justify-center transition-all duration-100
                          active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                          ${getSlideButtonStyle(getSlideState(dir))}`}
                        title={`${dir}: Click to cycle (Off → Attack → Move → Both)`}
                      >
                        {arrows[dir]}
                      </button>
                    ))}
                  </div>
                  {/* Legend */}
                  <div className="mt-3 flex flex-wrap justify-center gap-3 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-[var(--bg-card)] border border-[var(--border-color)]" />
                      <span>Off</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-red-400 border border-[var(--border-color)]" />
                      <span>Attack</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-green-500 border border-[var(--border-color)]" />
                      <span>Move</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-purple-500 border border-[var(--border-color)]" />
                      <span>Both</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
