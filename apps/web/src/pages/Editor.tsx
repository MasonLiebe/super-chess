import { useState, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EditorBoard } from '../components/chess/EditorBoard';
import { BoardThumbnail } from '../components/chess/BoardThumbnail';
import { PieceSelector } from '../components/editor/PieceSelector';
import { PieceEditorModal } from '../components/editor/PieceEditorModal';
import { IconSelectorModal, MAX_CUSTOM_PIECES } from '../components/editor/IconSelectorModal';
import { useEditorStore, STANDARD_PIECES } from '../stores/editorStore';
import { useAuthStore } from '../stores/authStore';
import { createVariant } from '../lib/api';
import { BOARD_SIZE } from '../lib/constants';
import { ArrowLeft, HelpCircle, RotateCcw, Play, Send, Plus, Pencil, Trash2, X, Swords, Globe } from 'lucide-react';

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

  const { user } = useAuthStore();

  const [showIconSelector, setShowIconSelector] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showStartOptions, setShowStartOptions] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [publishName, setPublishName] = useState('');
  const [publishDescription, setPublishDescription] = useState('');
  const [publishing, setPublishing] = useState(false);
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
    // Show options modal
    setShowStartOptions(true);
  }, [pieces, unregisteredPieces]);

  const handlePlayVsAI = useCallback(() => {
    setShowStartOptions(false);
    navigate('/singleplayer?from=editor');
  }, [navigate]);

  const handleCreateMultiplayerRoom = useCallback(() => {
    setShowStartOptions(false);
    navigate('/create-room?from=editor');
  }, [navigate]);

  const handlePublishClick = useCallback(() => {
    if (!user) {
      navigate('/login?redirect=/editor&action=publish');
      return;
    }
    if (unregisteredPieces.length > 0) {
      alert(`Please define movement patterns for: ${unregisteredPieces.join(', ')}`);
      return;
    }
    const whiteKing = pieces.find((p) => p.owner === 0 && p.pieceType === 'k');
    const blackKing = pieces.find((p) => p.owner === 1 && p.pieceType === 'k');
    if (!whiteKing || !blackKing) {
      alert('Both players need a King (k) piece!');
      return;
    }
    setPublishName('');
    setPublishDescription('');
    setShowPublishModal(true);
  }, [user, navigate, pieces, unregisteredPieces]);

  const handlePublishSubmit = useCallback(async () => {
    if (!publishName.trim()) return;
    setPublishing(true);
    try {
      const state = getGameState();
      const variant = await createVariant(publishName.trim(), publishDescription.trim(), state);
      setShowPublishModal(false);
      navigate(`/variants/${variant.id}`);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to publish');
    } finally {
      setPublishing(false);
    }
  }, [publishName, publishDescription, getGameState, navigate]);

  return (
    <div className="min-h-screen bg-[var(--bg-page)] p-4 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            className="flex items-center gap-1.5 bg-[var(--bg-card)] border-4 border-[var(--border-color)] shadow-[4px_4px_0px_var(--shadow-color)] px-4 py-2 font-bold text-[var(--text-primary)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_var(--shadow-color)] transition-all"
          >
            <ArrowLeft size={18} strokeWidth={3} />
            BACK
          </Link>
          <h1 className="text-2xl font-black text-[var(--text-primary)]">BOARD EDITOR</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setShowHelp(true)}
              className="flex items-center gap-1.5 bg-[#4ecdc4] border-4 border-[var(--border-color)] shadow-[4px_4px_0px_var(--shadow-color)] px-4 py-2 font-bold text-[var(--color-dark)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_var(--shadow-color)] transition-all"
            >
              <HelpCircle size={18} />
              HELP
            </button>
            <button
              onClick={resetBoard}
              className="flex items-center gap-1.5 bg-[#ff6b6b] border-4 border-[var(--border-color)] shadow-[4px_4px_0px_var(--shadow-color)] px-4 py-2 font-bold text-[var(--color-dark)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_var(--shadow-color)] transition-all"
            >
              <RotateCcw size={16} strokeWidth={3} />
              RESET
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left panel - Board config */}
          <div className="w-full lg:w-64 space-y-4">
            {/* Board Size */}
            <div className="bg-[var(--bg-card)] border-4 border-[var(--border-color)] shadow-[4px_4px_0px_var(--shadow-color)] p-4">
              <h2 className="font-bold text-[var(--text-primary)] mb-4">BOARD SIZE</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                    Width: {width}
                  </label>
                  <input
                    type="range"
                    min={BOARD_SIZE.MIN}
                    max={BOARD_SIZE.MAX}
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className="w-full h-2 bg-[var(--divider)] rounded-lg appearance-none cursor-pointer accent-[#4ecdc4]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                    Height: {height}
                  </label>
                  <input
                    type="range"
                    min={BOARD_SIZE.MIN}
                    max={BOARD_SIZE.MAX}
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full h-2 bg-[var(--divider)] rounded-lg appearance-none cursor-pointer accent-[#4ecdc4]"
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
                      className={`px-3 py-1 text-sm font-bold border-2 border-[var(--border-color)] ${
                        width === w && height === h
                          ? 'bg-[#4ecdc4]'
                          : 'bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)]'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tools */}
            <div className="bg-[var(--bg-card)] border-4 border-[var(--border-color)] shadow-[4px_4px_0px_var(--shadow-color)] p-4">
              <h2 className="font-bold text-[var(--text-primary)] mb-4">TOOLS</h2>

              <div className="space-y-2">
                <button
                  onClick={() => setCurrentTool('placePiece')}
                  className={`w-full p-2 text-center font-medium border-2 border-[var(--border-color)] ${
                    currentTool === 'placePiece'
                      ? 'bg-[#4ecdc4]'
                      : 'bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)]'
                  }`}
                >
                  Place Piece
                </button>
                <button
                  onClick={() => setCurrentTool('toggleTile')}
                  className={`w-full p-2 text-center font-medium border-2 border-[var(--border-color)] ${
                    currentTool === 'toggleTile'
                      ? 'bg-[#4ecdc4]'
                      : 'bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)]'
                  }`}
                >
                  Disable Tiles
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button
                onClick={handleStartGame}
                className="flex items-center justify-center gap-2 w-full bg-[#4ecdc4] border-4 border-[var(--border-color)] shadow-[4px_4px_0px_var(--shadow-color)] p-3 font-bold text-[var(--color-dark)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_var(--shadow-color)] transition-all"
              >
                <Play size={16} strokeWidth={3} />
                START GAME
              </button>
              <button
                onClick={handlePublishClick}
                className="flex items-center justify-center gap-2 w-full bg-[#a29bfe] border-4 border-[var(--border-color)] shadow-[4px_4px_0px_var(--shadow-color)] p-3 font-bold text-[var(--color-dark)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_var(--shadow-color)] transition-all"
              >
                <Send size={16} strokeWidth={3} />
                PUBLISH
              </button>
            </div>
          </div>

          {/* Center - Board (show first on mobile) */}
          <div className="flex-1 flex justify-center order-first lg:order-none w-full max-w-[560px] mx-auto lg:max-w-none">
            <EditorBoard />
          </div>

          {/* Right panel - Pieces */}
          <div className="w-full lg:w-72 space-y-4">
            {/* Owner selection */}
            <div className="bg-[var(--bg-card)] border-4 border-[var(--border-color)] shadow-[4px_4px_0px_var(--shadow-color)] p-4">
              <h2 className="font-bold text-[var(--text-primary)] mb-4">PLAYER</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedOwner(0)}
                  className={`flex-1 p-2 font-bold border-2 border-[var(--border-color)] flex items-center justify-center gap-2 ${
                    selectedOwner === 0
                      ? 'bg-[#4ecdc4]'
                      : 'bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)]'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white border-2 border-[var(--border-color)]" />
                  White
                </button>
                <button
                  onClick={() => setSelectedOwner(1)}
                  className={`flex-1 p-2 font-bold border-2 border-[var(--border-color)] flex items-center justify-center gap-2 ${
                    selectedOwner === 1
                      ? 'bg-[#4ecdc4]'
                      : 'bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)]'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-[#2d3436] border-2 border-[var(--border-color)]" />
                  Black
                </button>
              </div>
            </div>

            {/* Standard Pieces */}
            <div className="bg-[var(--bg-card)] border-4 border-[var(--border-color)] shadow-[4px_4px_0px_var(--shadow-color)] p-4">
              <h2 className="font-bold text-[var(--text-primary)] mb-4">STANDARD PIECES</h2>
              <PieceSelector
                pieces={[...STANDARD_PIECES]}
                selectedPiece={selectedPieceType}
                onSelect={setSelectedPieceType}
                owner={selectedOwner}
              />
            </div>

            {/* Custom Pieces */}
            <div className="bg-[var(--bg-card)] border-4 border-[var(--border-color)] shadow-[4px_4px_0px_var(--shadow-color)] p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-[var(--text-primary)]">CUSTOM PIECES</h2>
                <span className="text-xs text-[var(--text-secondary)]">
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
                        className={`aspect-square border-2 border-[var(--border-color)] flex items-center justify-center p-1 cursor-grab active:cursor-grabbing ${
                          selectedPieceType === p
                            ? 'bg-[#4ecdc4]'
                            : 'bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)]'
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
                      className={`flex-1 p-2 text-sm font-bold border-2 border-[var(--border-color)] transition-colors ${
                        configuredPieces.includes(selectedPieceType)
                          ? 'bg-[#4ecdc4] hover:bg-[#45b7aa] text-[var(--color-dark)]'
                          : 'bg-[var(--bg-disabled)] text-[var(--text-disabled)] cursor-not-allowed'
                      }`}
                    >
                      <span className="flex items-center justify-center gap-1"><Pencil size={14} /> EDIT</span>
                    </button>
                    <button
                      onClick={() => configuredPieces.includes(selectedPieceType) && handleDeletePiece(selectedPieceType)}
                      disabled={!configuredPieces.includes(selectedPieceType)}
                      className={`flex-1 p-2 text-sm font-bold border-2 border-[var(--border-color)] transition-colors ${
                        configuredPieces.includes(selectedPieceType)
                          ? 'bg-[#ff6b6b] hover:bg-red-400 text-[var(--color-dark)]'
                          : 'bg-[var(--bg-disabled)] text-[var(--text-disabled)] cursor-not-allowed'
                      }`}
                    >
                      <span className="flex items-center justify-center gap-1"><Trash2 size={14} /> DELETE</span>
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-[var(--text-secondary)] mb-4 text-center py-4">
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
                className={`w-full p-3 font-bold border-2 border-[var(--border-color)] shadow-[3px_3px_0px_var(--shadow-color)]
                  transition-all active:translate-x-[3px] active:translate-y-[3px] active:shadow-none
                  ${configuredPieces.length >= MAX_CUSTOM_PIECES
                    ? 'bg-[var(--bg-disabled)] text-[var(--text-disabled)] cursor-not-allowed'
                    : 'bg-[#ffe66d] hover:brightness-105'
                  }`}
              >
                <span className="flex items-center justify-center gap-1.5"><Plus size={18} strokeWidth={3} /> CREATE NEW PIECE</span>
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
          <div className="bg-[var(--bg-card)] border-4 border-[var(--border-color)] shadow-[8px_8px_0px_var(--shadow-color)] max-w-md w-full">
            <div className="flex items-center justify-between p-4 border-b-4 border-[var(--border-color)]">
              <h2 className="text-xl font-black text-[var(--text-primary)]">HOW TO USE</h2>
              <button
                onClick={() => setShowHelp(false)}
                className="w-10 h-10 bg-[#ff6b6b] border-2 border-[var(--border-color)] font-bold text-xl hover:bg-red-400 flex items-center justify-center"
              >
                <X size={20} strokeWidth={3} />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <h3 className="font-bold text-[var(--text-primary)] mb-2">Placing Pieces</h3>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  <li>• Select a piece from the right panel</li>
                  <li>• Click on the board to place it</li>
                  <li>• Right-click to remove a piece</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-[var(--text-primary)] mb-2">Board Setup</h3>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  <li>• Use sliders to adjust board size</li>
                  <li>• Toggle Tiles tool to disable squares</li>
                  <li>• Both players need a King to start</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-[var(--text-primary)] mb-2">Custom Pieces</h3>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  <li>• Click "Create New Piece" to add custom pieces</li>
                  <li>• Define movement patterns in the editor</li>
                  <li>• Custom pieces must have patterns before starting</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Start Game Options Modal */}
      {showStartOptions && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--bg-card)] border-4 border-[var(--border-color)] shadow-[8px_8px_0px_var(--shadow-color)] max-w-sm w-full">
            <div className="flex items-center justify-between p-4 border-b-4 border-[var(--border-color)]">
              <h2 className="text-xl font-black text-[var(--text-primary)]">START GAME</h2>
              <button
                onClick={() => setShowStartOptions(false)}
                className="w-10 h-10 bg-[#ff6b6b] border-2 border-[var(--border-color)] font-bold text-xl hover:bg-red-400 flex items-center justify-center"
              >
                <X size={20} strokeWidth={3} />
              </button>
            </div>
            <div className="p-4 space-y-3">
              <button
                onClick={handlePlayVsAI}
                className="flex items-center justify-center gap-2 w-full bg-[#4ecdc4] border-4 border-[var(--border-color)] shadow-[4px_4px_0px_var(--shadow-color)] p-4 font-bold text-[var(--color-dark)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_var(--shadow-color)] transition-all"
              >
                <Swords size={18} />
                PLAY VS AI
              </button>
              <button
                onClick={handleCreateMultiplayerRoom}
                className="flex items-center justify-center gap-2 w-full bg-[#ffe66d] border-4 border-[var(--border-color)] shadow-[4px_4px_0px_var(--shadow-color)] p-4 font-bold text-[var(--color-dark)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_var(--shadow-color)] transition-all"
              >
                <Globe size={18} />
                CREATE MULTIPLAYER ROOM
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Publish Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--bg-card)] border-4 border-[var(--border-color)] shadow-[8px_8px_0px_var(--shadow-color)] max-w-md w-full">
            <div className="flex items-center justify-between p-4 border-b-4 border-[var(--border-color)]">
              <h2 className="text-xl font-black text-[var(--text-primary)]">PUBLISH VARIANT</h2>
              <button
                onClick={() => setShowPublishModal(false)}
                className="w-10 h-10 bg-[#ff6b6b] border-2 border-[var(--border-color)] font-bold text-xl hover:bg-red-400"
              >
                x
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex justify-center">
                <BoardThumbnail gameState={getGameState()} size={150} />
              </div>
              <div>
                <label className="block font-bold text-[var(--text-primary)] mb-1">NAME</label>
                <input
                  type="text"
                  value={publishName}
                  onChange={(e) => setPublishName(e.target.value)}
                  placeholder="My Chess Variant"
                  maxLength={100}
                  className="w-full p-2 border-2 border-[var(--border-color)] font-medium text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                />
              </div>
              <div>
                <label className="block font-bold text-[var(--text-primary)] mb-1">DESCRIPTION (OPTIONAL)</label>
                <textarea
                  value={publishDescription}
                  onChange={(e) => setPublishDescription(e.target.value)}
                  placeholder="Describe your variant..."
                  rows={3}
                  maxLength={2000}
                  className="w-full p-2 border-2 border-[var(--border-color)] font-medium text-[var(--text-primary)] placeholder:text-[var(--text-muted)] resize-none"
                />
              </div>
              <button
                onClick={handlePublishSubmit}
                disabled={!publishName.trim() || publishing}
                className="w-full bg-[#a29bfe] border-4 border-[var(--border-color)] shadow-[4px_4px_0px_var(--shadow-color)] p-3 font-bold text-[var(--color-dark)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_var(--shadow-color)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {publishing ? 'PUBLISHING...' : 'PUBLISH'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
