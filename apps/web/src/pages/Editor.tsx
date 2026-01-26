import { useState, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EditorBoard } from '../components/chess/EditorBoard';
import { PieceSelector } from '../components/editor/PieceSelector';
import { PieceEditorModal } from '../components/editor/PieceEditorModal';
import { IconSelectorModal, MAX_CUSTOM_PIECES } from '../components/editor/IconSelectorModal';
import { useEditorStore, STANDARD_PIECES } from '../stores/editorStore';
import { BOARD_SIZE } from '../lib/constants';

export function Editor() {
  const navigate = useNavigate();
  const {
    width,
    height,
    setWidth,
    setHeight,
    currentTool,
    setCurrentTool,
    selectedPieceType,
    setSelectedPieceType,
    selectedOwner,
    setSelectedOwner,
    pieces,
    movementPatterns,
    editingPiece,
    setEditingPiece,
    resetBoard,
    getGameState,
    removeMovementPattern,
  } = useEditorStore();

  const [showExport, setShowExport] = useState(false);
  const [showIconSelector, setShowIconSelector] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const customPieceImageRefs = useRef<Map<string, HTMLImageElement>>(new Map());

  // Get list of custom pieces that are placed on the board
  const placedCustomPieces = [...new Set(
    pieces
      .map((p) => p.pieceType.toLowerCase())
      .filter((t) => !STANDARD_PIECES.includes(t as typeof STANDARD_PIECES[number]))
  )];

  // Get custom pieces that have movement patterns defined (these are the "configured" pieces)
  const configuredPieces = Object.keys(movementPatterns).filter(
    (k) => !STANDARD_PIECES.includes(k as typeof STANDARD_PIECES[number])
  );

  // Custom pieces that are placed but don't have patterns yet
  const unregisteredPieces = placedCustomPieces.filter(
    (p) => !configuredPieces.includes(p)
  );

  // Handle icon selection - open the piece editor with the selected icon
  const handleIconSelect = useCallback((icon: string) => {
    setShowIconSelector(false);
    setEditingPiece(icon);
  }, [setEditingPiece]);

  // Delete a configured piece
  const handleDeletePiece = useCallback((pieceType: string) => {
    if (confirm(`Delete custom piece "${pieceType.toUpperCase()}"? This will remove it from the board too.`)) {
      removeMovementPattern(pieceType);
      // Also remove from board
      useEditorStore.setState((state) => ({
        pieces: state.pieces.filter((p) => p.pieceType !== pieceType),
      }));
      // Reset selection if this piece was selected
      if (selectedPieceType === pieceType) {
        setSelectedPieceType('p');
      }
    }
  }, [removeMovementPattern, selectedPieceType, setSelectedPieceType]);

  const handleExport = useCallback(() => {
    const state = getGameState();
    const json = JSON.stringify(state, null, 2);
    navigator.clipboard.writeText(json);
    setShowExport(true);
    setTimeout(() => setShowExport(false), 2000);
  }, [getGameState]);

  const handleStartGame = useCallback(() => {
    if (unregisteredPieces.length > 0) {
      alert(`Please define movement patterns for: ${unregisteredPieces.join(', ')}`);
      return;
    }
    // Check for kings
    const whiteKing = pieces.find((p) => p.owner === 0 && p.pieceType === 'k');
    const blackKing = pieces.find((p) => p.owner === 1 && p.pieceType === 'k');
    if (!whiteKing || !blackKing) {
      alert('Both players need a King (k) piece!');
      return;
    }
    // Navigate to VS AI page with the custom game
    navigate('/singleplayer?from=editor');
  }, [pieces, unregisteredPieces, navigate]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            className="bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] px-4 py-2 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all"
          >
            BACK
          </Link>
          <h1 className="text-2xl font-black text-[#2d3436]">BOARD EDITOR</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setShowHelp(true)}
              className="bg-[#4ecdc4] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] px-4 py-2 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all"
            >
              HELP
            </button>
            <button
              onClick={resetBoard}
              className="bg-[#ff6b6b] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] px-4 py-2 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all"
            >
              RESET
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left panel - Board config */}
          <div className="w-full lg:w-64 space-y-4">
            {/* Board Size */}
            <div className="bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4">
              <h2 className="font-bold text-[#2d3436] mb-4">BOARD SIZE</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#636e72] mb-1">
                    Width: {width}
                  </label>
                  <input
                    type="range"
                    min={BOARD_SIZE.MIN}
                    max={BOARD_SIZE.MAX}
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className="w-full h-2 bg-[#ddd] rounded-lg appearance-none cursor-pointer accent-[#4ecdc4]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#636e72] mb-1">
                    Height: {height}
                  </label>
                  <input
                    type="range"
                    min={BOARD_SIZE.MIN}
                    max={BOARD_SIZE.MAX}
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full h-2 bg-[#ddd] rounded-lg appearance-none cursor-pointer accent-[#4ecdc4]"
                  />
                </div>

                {/* Quick presets */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { w: 8, h: 8, label: '8×8' },
                    { w: 10, h: 8, label: '10×8' },
                    { w: 10, h: 10, label: '10×10' },
                  ].map(({ w, h, label }) => (
                    <button
                      key={label}
                      onClick={() => {
                        setWidth(w);
                        setHeight(h);
                      }}
                      className={`px-3 py-1 text-sm font-bold border-2 border-[#2d3436] ${
                        width === w && height === h
                          ? 'bg-[#4ecdc4]'
                          : 'bg-white hover:bg-[#f8f9fa]'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tools */}
            <div className="bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4">
              <h2 className="font-bold text-[#2d3436] mb-4">TOOLS</h2>

              <div className="space-y-2">
                <button
                  onClick={() => setCurrentTool('placePiece')}
                  className={`w-full p-2 text-center font-medium border-2 border-[#2d3436] ${
                    currentTool === 'placePiece'
                      ? 'bg-[#4ecdc4]'
                      : 'bg-white hover:bg-[#f8f9fa]'
                  }`}
                >
                  Place Piece
                </button>
                <button
                  onClick={() => setCurrentTool('toggleTile')}
                  className={`w-full p-2 text-center font-medium border-2 border-[#2d3436] ${
                    currentTool === 'toggleTile'
                      ? 'bg-[#4ecdc4]'
                      : 'bg-white hover:bg-[#f8f9fa]'
                  }`}
                >
                  Disable Tiles
                </button>
              </div>
            </div>

            {/* Export/Start */}
            <div className="space-y-2">
              <button
                onClick={handleExport}
                className="w-full bg-[#ffe66d] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-3 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all"
              >
                {showExport ? 'COPIED!' : 'EXPORT JSON'}
              </button>
              <button
                onClick={handleStartGame}
                className="w-full bg-[#4ecdc4] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-3 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all"
              >
                START GAME
              </button>
            </div>
          </div>

          {/* Center - Board */}
          <div className="flex-1 flex justify-center">
            <EditorBoard />
          </div>

          {/* Right panel - Pieces */}
          <div className="w-full lg:w-72 space-y-4">
            {/* Owner selection */}
            <div className="bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4">
              <h2 className="font-bold text-[#2d3436] mb-4">PLAYER</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedOwner(0)}
                  className={`flex-1 p-2 font-bold border-2 border-[#2d3436] flex items-center justify-center gap-2 ${
                    selectedOwner === 0
                      ? 'bg-[#4ecdc4]'
                      : 'bg-white hover:bg-[#f8f9fa]'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white border-2 border-[#2d3436]" />
                  White
                </button>
                <button
                  onClick={() => setSelectedOwner(1)}
                  className={`flex-1 p-2 font-bold border-2 border-[#2d3436] flex items-center justify-center gap-2 ${
                    selectedOwner === 1
                      ? 'bg-[#4ecdc4]'
                      : 'bg-white hover:bg-[#f8f9fa]'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-[#2d3436] border-2 border-[#2d3436]" />
                  Black
                </button>
              </div>
            </div>

            {/* Standard Pieces */}
            <div className="bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4">
              <h2 className="font-bold text-[#2d3436] mb-4">STANDARD PIECES</h2>
              <PieceSelector
                pieces={[...STANDARD_PIECES]}
                selectedPiece={selectedPieceType}
                onSelect={setSelectedPieceType}
                owner={selectedOwner}
              />
            </div>

            {/* Custom Pieces */}
            <div className="bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-[#2d3436]">CUSTOM PIECES</h2>
                <span className="text-xs text-[#636e72]">
                  {configuredPieces.length}/{MAX_CUSTOM_PIECES}
                </span>
              </div>

              {/* Configured custom pieces */}
              {configuredPieces.length > 0 ? (
                <div className="mb-4">
                  <div className="grid grid-cols-3 gap-2">
                    {configuredPieces.map((p) => (
                      <button
                        key={p}
                        onClick={() => setSelectedPieceType(p)}
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData('application/json', JSON.stringify({ pieceType: p, owner: selectedOwner }));
                          e.dataTransfer.effectAllowed = 'copy';
                          const img = customPieceImageRefs.current.get(p);
                          if (img) {
                            e.dataTransfer.setDragImage(img, 25, 25);
                          }
                        }}
                        className={`aspect-square border-2 border-[#2d3436] flex items-center justify-center p-1 cursor-grab active:cursor-grabbing ${
                          selectedPieceType === p
                            ? 'bg-[#4ecdc4]'
                            : 'bg-white hover:bg-[#f8f9fa]'
                        }`}
                        title={`${p.toUpperCase()} - Drag to board`}
                      >
                        <img
                          ref={(el) => {
                            if (el) customPieceImageRefs.current.set(p, el);
                          }}
                          src={`/images/chess_pieces/${selectedOwner === 0 ? 'white' : 'black'}/${p}.svg`}
                          alt={p}
                          className="w-full h-full object-contain pointer-events-none"
                        />
                      </button>
                    ))}
                  </div>

                  {/* Edit/Delete buttons for selected custom piece */}
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => configuredPieces.includes(selectedPieceType) && setEditingPiece(selectedPieceType)}
                      disabled={!configuredPieces.includes(selectedPieceType)}
                      className={`flex-1 p-2 text-sm font-bold border-2 border-[#2d3436] transition-colors ${
                        configuredPieces.includes(selectedPieceType)
                          ? 'bg-[#4ecdc4] hover:bg-[#45b7aa] text-[#2d3436]'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      ✎ EDIT
                    </button>
                    <button
                      onClick={() => configuredPieces.includes(selectedPieceType) && handleDeletePiece(selectedPieceType)}
                      disabled={!configuredPieces.includes(selectedPieceType)}
                      className={`flex-1 p-2 text-sm font-bold border-2 border-[#2d3436] transition-colors ${
                        configuredPieces.includes(selectedPieceType)
                          ? 'bg-[#ff6b6b] hover:bg-red-400 text-[#2d3436]'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      × DELETE
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-[#636e72] mb-4 text-center py-4">
                  No custom pieces yet
                </p>
              )}

              {/* Unregistered pieces warning */}
              {unregisteredPieces.length > 0 && (
                <div className="mb-4 p-2 bg-red-100 border-2 border-red-400">
                  <p className="text-xs text-red-700 mb-1">Needs movement pattern:</p>
                  <div className="flex flex-wrap gap-2">
                    {unregisteredPieces.map((p) => (
                      <button
                        key={p}
                        onClick={() => setEditingPiece(p)}
                        className="w-10 h-10 border-2 border-red-400 bg-red-50 flex items-center justify-center hover:bg-red-100"
                      >
                        <img
                          src={`/images/chess_pieces/${selectedOwner === 0 ? 'white' : 'black'}/${p}.svg`}
                          alt={p}
                          className="w-8 h-8"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Create new piece button */}
              <button
                onClick={() => setShowIconSelector(true)}
                disabled={configuredPieces.length >= MAX_CUSTOM_PIECES}
                className={`w-full p-3 font-bold border-2 border-[#2d3436] shadow-[3px_3px_0px_#2d3436]
                  transition-all active:translate-x-[3px] active:translate-y-[3px] active:shadow-none
                  ${configuredPieces.length >= MAX_CUSTOM_PIECES
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-[#ffe66d] hover:brightness-105'
                  }`}
              >
                + CREATE NEW PIECE
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Icon Selector Modal */}
      {showIconSelector && (
        <IconSelectorModal
          usedIcons={configuredPieces}
          onSelect={handleIconSelect}
          onClose={() => setShowIconSelector(false)}
        />
      )}

      {/* Piece Editor Modal */}
      {editingPiece && (
        <PieceEditorModal
          pieceType={editingPiece}
          onClose={() => setEditingPiece(null)}
        />
      )}

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white border-4 border-[#2d3436] shadow-[8px_8px_0px_#2d3436] max-w-md w-full">
            <div className="flex items-center justify-between p-4 border-b-4 border-[#2d3436]">
              <h2 className="text-xl font-black text-[#2d3436]">HOW TO USE</h2>
              <button
                onClick={() => setShowHelp(false)}
                className="w-10 h-10 bg-[#ff6b6b] border-2 border-[#2d3436] font-bold text-xl hover:bg-red-400"
              >
                ×
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <h3 className="font-bold text-[#2d3436] mb-2">Placing Pieces</h3>
                <ul className="text-sm text-[#636e72] space-y-1">
                  <li>• Select a piece from the right panel</li>
                  <li>• Click on the board to place it</li>
                  <li>• Right-click to remove a piece</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-[#2d3436] mb-2">Board Setup</h3>
                <ul className="text-sm text-[#636e72] space-y-1">
                  <li>• Use sliders to adjust board size</li>
                  <li>• Toggle Tiles tool to disable squares</li>
                  <li>• Both players need a King to start</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-[#2d3436] mb-2">Custom Pieces</h3>
                <ul className="text-sm text-[#636e72] space-y-1">
                  <li>• Click "Create New Piece" to add custom pieces</li>
                  <li>• Define movement patterns in the editor</li>
                  <li>• Custom pieces must have patterns before starting</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
