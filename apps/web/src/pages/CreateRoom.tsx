import { useState, useCallback, useEffect, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Board } from '../components/chess/Board';
import { useWebSocket } from '../contexts/WebSocketContext';
import { useGameStore } from '../stores/gameStore';
import { useEditorStore } from '../stores/editorStore';
import { PREBUILT_GAMES, DEFAULT_GAME } from '../prebuilt_games';
import { toRustGameState } from '../lib/convert';
import { getVariant } from '../lib/api';
import { ArrowLeft, Eye, ChevronDown, Compass, PencilRuler, Plus } from 'lucide-react';
import type { GameState, Seat } from '../types/chess';

export function CreateRoom() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { sendMessage } = useWebSocket();
  const { connected, currentRoom } = useGameStore();
  const editorStore = useEditorStore();

  const [previewState, setPreviewState] = useState<GameState>(DEFAULT_GAME.state);
  const [selectedGameId, setSelectedGameId] = useState(DEFAULT_GAME.id);
  const [isCustomGame, setIsCustomGame] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [showSeatModal, setShowSeatModal] = useState(false);
  const [gameDropdownOpen, setGameDropdownOpen] = useState(false);
  const gameDropdownRef = useRef<HTMLDivElement>(null);

  // Check if we're loading a custom game from the editor or a variant
  useEffect(() => {
    const from = searchParams.get('from');
    if (from === 'editor') {
      const customState = editorStore.getGameState();
      if (customState.pieces.length > 0) {
        setPreviewState(customState);
        setSelectedGameId('custom');
        setIsCustomGame(true);
      }
    } else if (from === 'variant') {
      const variantId = searchParams.get('id');
      if (variantId) {
        getVariant(Number(variantId))
          .then((v) => {
            setPreviewState(v.gameState);
            setSelectedGameId('custom');
            setIsCustomGame(true);
          })
          .catch(() => {
            // ignore, use default
          });
      }
    }
  }, [searchParams, editorStore]);

  // Navigate to room when created
  useEffect(() => {
    if (currentRoom) {
      navigate(`/room/${currentRoom}`);
    }
  }, [currentRoom, navigate]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (gameDropdownRef.current && !gameDropdownRef.current.contains(event.target as Node)) {
        setGameDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle game selection change
  const handleGameSelect = useCallback((gameId: string) => {
    if (gameId === 'custom') {
      return;
    }
    const game = PREBUILT_GAMES.find((g) => g.id === gameId);
    if (game) {
      setSelectedGameId(gameId);
      setPreviewState(game.state);
      setIsCustomGame(false);
    }
  }, []);

  const handleCreateRoom = useCallback((seat: Seat) => {
    if (!connected) return;

    sendMessage({
      type: 'CreateRoom',
      content: {
        room_name: roomName.trim() || null,
        is_public: isPublic,
        init_game_state: toRustGameState(previewState),
        seat,
      },
    });
    setShowSeatModal(false);
  }, [connected, sendMessage, previewState, isPublic, roomName]);

  const handleCreateCustomGame = useCallback(() => {
    editorStore.loadGameState(previewState);
    navigate('/editor?returnTo=create-room');
  }, [editorStore, previewState, navigate]);

  return (
    <div className="h-screen bg-[var(--bg-page)] px-4 pb-4 pt-12 flex flex-col">
      <div className="mx-auto w-full max-w-5xl flex-1 min-h-0 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4 shrink-0">
          <Link
            to="/multiplayer"
            className="flex items-center justify-center bg-[var(--bg-card)] border-4 border-[var(--border-color)] shadow-[4px_4px_0px_var(--shadow-color)] w-10 h-10 font-bold text-[var(--text-primary)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_var(--shadow-color)] transition-all"
            title="Back to lobby"
          >
            <ArrowLeft size={18} strokeWidth={3} />
          </Link>
          <h1 className="text-lg sm:text-2xl font-black text-[var(--text-primary)] flex-1 text-center">CREATE ROOM</h1>
          <div className="w-10" />
        </div>

        {/* Connection status */}
        {!connected && (
          <div className="mb-3 lg:mb-4 p-2 lg:p-3 border-2 lg:border-4 border-[var(--border-color)] shadow-[2px_2px_0px_var(--shadow-color)] lg:shadow-[4px_4px_0px_var(--shadow-color)] font-bold text-xs lg:text-base text-[var(--color-dark)] bg-[#ff6b6b] shrink-0">
            CONNECTING TO SERVER...
          </div>
        )}

        {/* Game area */}
        <div className="flex flex-1 min-h-0 flex-col lg:flex-row gap-4 lg:gap-6 lg:items-center lg:justify-center">
          {/* Board Preview */}
          <div className="flex-shrink-0 w-full max-w-[560px] mx-auto lg:mx-0">
            <Board
              gameState={previewState}
              playerNum={0}
              flipped={false}
              disabled={true}
              reservedHeight={{ mobile: 380, desktop: 130 }}
            />
          </div>

          {/* Side panel */}
          <div className="w-full lg:w-72 space-y-2 lg:space-y-4">
            {/* Room Settings Panel */}
            <div className="bg-[var(--bg-card)] border-2 lg:border-4 border-[var(--border-color)] shadow-[2px_2px_0px_var(--shadow-color)] lg:shadow-[4px_4px_0px_var(--shadow-color)] p-2 lg:p-4 space-y-3 lg:space-y-4">
              <h2 className="font-bold text-[var(--text-primary)] text-xs lg:text-base">ROOM SETTINGS</h2>

              {/* Room name + visibility row */}
              <div className="flex gap-2 items-end">
                <div className="flex-1 min-w-0">
                  <span className="font-bold text-[var(--text-secondary)] text-[10px] lg:text-xs block mb-1">NAME</span>
                  <input
                    type="text"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    placeholder="Auto-generated"
                    className="w-full p-1.5 lg:p-2 border lg:border-2 border-[var(--border-color)] font-medium text-xs lg:text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                  />
                </div>
                <label className="flex items-center gap-2 cursor-pointer pb-0.5">
                  <div
                    className={`w-8 h-4 lg:w-10 lg:h-5 border-2 border-[var(--border-color)] relative transition-colors ${
                      isPublic ? 'bg-[#4ecdc4]' : 'bg-[var(--divider)]'
                    }`}
                    onClick={() => setIsPublic(!isPublic)}
                  >
                    <div
                      className={`absolute top-0 w-2.5 h-2.5 lg:w-3.5 lg:h-3.5 bg-[var(--bg-card)] border-2 border-[var(--border-color)] transition-all ${
                        isPublic ? 'left-3.5 lg:left-5' : 'left-0.5'
                      }`}
                    />
                  </div>
                  <span className="text-[10px] lg:text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap">
                    {isPublic ? 'Public' : 'Private'}
                  </span>
                </label>
              </div>

              {/* Variant Dropdown */}
              <div ref={gameDropdownRef} className="relative">
                <span className="font-bold text-[var(--text-secondary)] text-[10px] lg:text-xs block mb-1">PREBUILT VARIANTS</span>
                {(() => {
                  const selectedGame = selectedGameId === 'custom'
                    ? { name: 'Custom Game', description: `${previewState.width}×${previewState.height}`, isCustom: true }
                    : (() => { const g = PREBUILT_GAMES.find((g) => g.id === selectedGameId)!; return { name: g.name, description: `${g.state.width}×${g.state.height}`, isCustom: false }; })();
                  return (
                    <button
                      onClick={() => setGameDropdownOpen(!gameDropdownOpen)}
                      className={`w-full p-2 lg:p-3 border lg:border-3 border-[var(--border-color)] font-bold cursor-pointer flex items-center gap-2 lg:gap-3 transition-all hover:brightness-95 ${
                        selectedGame.isCustom
                          ? 'bg-[#ffe66d] text-[var(--color-dark)]'
                          : 'bg-[#4ecdc4] text-[var(--color-dark)]'
                      }`}
                    >
                      <div className="flex-1 text-left min-w-0">
                        <div className="text-xs lg:text-base truncate">{selectedGame.name}</div>
                        <div className="text-[10px] lg:text-xs font-medium opacity-70 hidden lg:block">{selectedGame.description}</div>
                      </div>
                      <ChevronDown
                        size={16}
                        strokeWidth={3}
                        className={`transition-transform ${gameDropdownOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                  );
                })()}

                {gameDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 border lg:border-3 border-[var(--border-color)] bg-[var(--bg-card)] shadow-[4px_4px_0px_var(--shadow-color)] z-10 overflow-hidden max-h-64 overflow-y-auto">
                    {PREBUILT_GAMES.map((game) => (
                      <button
                        key={game.id}
                        onClick={() => {
                          handleGameSelect(game.id);
                          setGameDropdownOpen(false);
                        }}
                        className={`w-full p-2 lg:p-3 text-left font-bold flex items-center gap-2 lg:gap-3 transition-colors hover:bg-[var(--bg-card-hover)] ${
                          selectedGameId === game.id ? 'bg-[#4ecdc4] text-[var(--color-dark)]' : 'text-[var(--text-primary)]'
                        }`}
                      >
                        <div className="flex-1">
                          <div className="text-xs lg:text-base">{game.name}</div>
                          <div className={`text-[10px] lg:text-xs font-medium ${selectedGameId === game.id ? 'opacity-70' : 'text-[var(--text-secondary)]'}`}>{game.description}</div>
                        </div>
                      </button>
                    ))}
                    {isCustomGame && (
                      <button
                        onClick={() => {
                          handleGameSelect('custom');
                          setGameDropdownOpen(false);
                        }}
                        className={`w-full p-2 lg:p-3 text-left font-bold flex items-center gap-2 lg:gap-3 transition-colors hover:bg-[var(--bg-card-hover)] ${
                          selectedGameId === 'custom' ? 'bg-[#ffe66d] text-[var(--color-dark)]' : 'text-[var(--text-primary)]'
                        }`}
                      >
                        <div className="flex-1">
                          <div className="text-xs lg:text-base">Custom Game</div>
                          <div className={`text-[10px] lg:text-xs font-medium ${selectedGameId === 'custom' ? 'opacity-70' : 'text-[var(--text-secondary)]'}`}>{previewState.width}×{previewState.height}</div>
                        </div>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="border-t-2 border-[var(--divider)]" />

              {/* Custom variant options */}
              <div>
                <span className="font-bold text-[var(--text-secondary)] text-[10px] lg:text-xs block mb-1">CUSTOM VARIANTS</span>
                <div className="flex gap-2">
                  <Link
                    to="/browse"
                    className="flex items-center justify-center gap-1.5 flex-1 bg-[#a29bfe] border lg:border-3 border-[var(--border-color)] p-1.5 lg:p-2.5 font-bold text-[10px] lg:text-sm text-[var(--color-dark)] hover:brightness-95 transition-all"
                  >
                    <Compass size={12} strokeWidth={2.5} className="flex-shrink-0" />
                    BROWSE
                  </Link>
                  <button
                    onClick={handleCreateCustomGame}
                    className="flex items-center justify-center gap-1.5 flex-1 bg-[#ffe66d] border lg:border-3 border-[var(--border-color)] p-1.5 lg:p-2.5 font-bold text-[10px] lg:text-sm text-[var(--color-dark)] hover:brightness-95 transition-all"
                  >
                    <PencilRuler size={12} strokeWidth={2.5} className="flex-shrink-0" />
                    EDITOR
                  </button>
                </div>
              </div>
            </div>

            {/* Custom game info */}
            {isCustomGame && selectedGameId === 'custom' && (
              <div className="bg-[#ffe66d] border-2 lg:border-4 border-[var(--border-color)] shadow-[2px_2px_0px_var(--shadow-color)] lg:shadow-[4px_4px_0px_var(--shadow-color)] p-2 lg:p-4">
                <h3 className="font-bold text-[var(--color-dark)] text-xs lg:text-base mb-1">Custom Game</h3>
                <p className="text-xs lg:text-sm text-[var(--color-dark)]">
                  {previewState.pieces.length} pieces on the board.
                </p>
              </div>
            )}

            {/* Create Room button */}
            <button
              onClick={() => setShowSeatModal(true)}
              disabled={!connected}
              className="flex items-center justify-center gap-2 w-full bg-[#4ecdc4] border-2 lg:border-4 border-[var(--border-color)] shadow-[2px_2px_0px_var(--shadow-color)] lg:shadow-[4px_4px_0px_var(--shadow-color)] p-2.5 lg:p-4 font-bold text-sm lg:text-base text-[var(--color-dark)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none lg:hover:shadow-[2px_2px_0px_var(--shadow-color)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus size={16} strokeWidth={3} />
              CREATE ROOM
            </button>
          </div>
        </div>
      </div>

      {/* Seat Selection Modal */}
      {showSeatModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[var(--bg-card)] border-4 border-[var(--border-color)] shadow-[8px_8px_0px_var(--shadow-color)] p-6 max-w-sm w-full mx-4">
            <h2 className="font-bold text-[var(--text-primary)] text-xl mb-4 text-center">SELECT YOUR SEAT</h2>
            <div className="space-y-3">
              <button
                onClick={() => handleCreateRoom('white')}
                className="w-full p-3 border-2 border-[var(--border-color)] font-bold text-[var(--text-primary)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] transition-colors flex items-center gap-3"
              >
                <span className="w-6 h-6 rounded-full bg-white border-2 border-[var(--border-color)]" />
                Play as White
              </button>
              <button
                onClick={() => handleCreateRoom('black')}
                className="w-full p-3 border-2 border-[var(--border-color)] font-bold text-white bg-[#2d3436] hover:bg-[#636e72] transition-colors flex items-center gap-3"
              >
                <span className="w-6 h-6 rounded-full bg-[#2d3436] border-2 border-white" />
                Play as Black
              </button>
              <button
                onClick={() => handleCreateRoom('spectator')}
                className="w-full p-3 border-2 border-[var(--border-color)] font-bold text-[var(--text-primary)] bg-[var(--divider)] hover:bg-[var(--text-muted)] transition-colors flex items-center gap-3"
              >
                <Eye size={24} />
                Watch as Spectator
              </button>
            </div>
            <button
              onClick={() => setShowSeatModal(false)}
              className="w-full mt-4 p-2 border-2 border-[var(--border-color)] font-bold text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
