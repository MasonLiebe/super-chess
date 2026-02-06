import { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Board } from '../components/chess/Board';
import { useWebSocket } from '../contexts/WebSocketContext';
import { useGameStore } from '../stores/gameStore';
import { useEditorStore } from '../stores/editorStore';
import { PREBUILT_GAMES, DEFAULT_GAME } from '../prebuilt_games';
import { toRustGameState } from '../lib/convert';
import { getVariant } from '../lib/api';
import { ArrowLeft, Eye, X } from 'lucide-react';
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
    <div className="min-h-screen bg-[#f8f9fa] p-4 flex flex-col justify-center">
      <div className="max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/multiplayer"
            className="flex items-center gap-1.5 bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] px-4 py-2 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all"
          >
            <ArrowLeft size={18} strokeWidth={3} />
            BACK
          </Link>
          <h1 className="text-2xl font-black text-[#2d3436]">CREATE ROOM</h1>
          <div className="w-20" />
        </div>

        {/* Connection status */}
        {!connected && (
          <div className="mb-6 p-3 border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] font-bold bg-[#ff6b6b]">
            CONNECTING TO SERVER...
          </div>
        )}

        {/* Game area */}
        <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">
          {/* Board Preview */}
          <div className="flex-shrink-0">
            <Board
              gameState={previewState}
              playerNum={0}
              flipped={false}
              disabled={true}
            />
          </div>

          {/* Side panel */}
          <div className="w-full lg:w-72 space-y-4">
            {/* Room Name & Visibility */}
            <div className="bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4">
              <label className="font-bold text-[#2d3436] block mb-2">
                ROOM NAME (OPTIONAL)
              </label>
              <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Auto-generated if empty"
                className="w-full p-2 border-2 border-[#2d3436] font-medium text-[#2d3436] placeholder:text-[#b2bec3] mb-3"
              />
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  className={`w-10 h-5 border-2 border-[#2d3436] relative transition-colors ${
                    isPublic ? 'bg-[#4ecdc4]' : 'bg-[#dfe6e9]'
                  }`}
                  onClick={() => setIsPublic(!isPublic)}
                >
                  <div
                    className={`absolute top-0 w-3.5 h-3.5 bg-white border-2 border-[#2d3436] transition-all ${
                      isPublic ? 'left-5' : 'left-0.5'
                    }`}
                  />
                </div>
                <span className="text-sm text-[#636e72]">
                  {isPublic ? 'Public room' : 'Private room'}
                </span>
              </label>
            </div>

            {/* Game Selection */}
            <div className="bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4">
              <h2 className="font-bold text-[#2d3436] mb-4">SELECT GAME</h2>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {PREBUILT_GAMES.map((game) => (
                  <button
                    key={game.id}
                    onClick={() => handleGameSelect(game.id)}
                    className={`w-full p-2 text-left border-2 border-[#2d3436] transition-colors ${
                      selectedGameId === game.id
                        ? 'bg-[#4ecdc4]'
                        : 'bg-white hover:bg-[#f8f9fa]'
                    }`}
                  >
                    <div className="font-bold text-sm">{game.name}</div>
                    <div className="text-xs text-[#636e72]">
                      {game.state.width}x{game.state.height}
                    </div>
                  </button>
                ))}

                {isCustomGame && (
                  <button
                    onClick={() => handleGameSelect('custom')}
                    className={`w-full p-2 text-left border-2 border-[#2d3436] transition-colors ${
                      selectedGameId === 'custom'
                        ? 'bg-[#ffe66d]'
                        : 'bg-white hover:bg-[#f8f9fa]'
                    }`}
                  >
                    <div className="font-bold text-sm">Custom Game</div>
                    <div className="text-xs text-[#636e72]">
                      {previewState.width}x{previewState.height} (from editor)
                    </div>
                  </button>
                )}
              </div>
            </div>

            {/* Custom game info */}
            {isCustomGame && selectedGameId === 'custom' && (
              <div className="bg-[#ffe66d] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4">
                <h3 className="font-bold text-[#2d3436] mb-2">Custom Game</h3>
                <p className="text-sm text-[#2d3436]">
                  Board created in the editor with {previewState.pieces.length} pieces.
                </p>
              </div>
            )}

            {/* Create Room button */}
            <button
              onClick={() => setShowSeatModal(true)}
              disabled={!connected}
              className="w-full bg-[#4ecdc4] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              CREATE ROOM
            </button>

            {/* Create Custom Game button */}
            <button
              onClick={handleCreateCustomGame}
              className="w-full bg-[#ffe66d] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all"
            >
              CREATE CUSTOM GAME
            </button>
          </div>
        </div>
      </div>

      {/* Seat Selection Modal */}
      {showSeatModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white border-4 border-[#2d3436] shadow-[8px_8px_0px_#2d3436] p-6 max-w-sm w-full mx-4">
            <h2 className="font-bold text-[#2d3436] text-xl mb-4 text-center">SELECT YOUR SEAT</h2>
            <div className="space-y-3">
              <button
                onClick={() => handleCreateRoom('white')}
                className="w-full p-3 border-2 border-[#2d3436] font-bold text-[#2d3436] bg-white hover:bg-[#f8f9fa] transition-colors flex items-center gap-3"
              >
                <span className="w-6 h-6 rounded-full bg-white border-2 border-[#2d3436]" />
                Play as White
              </button>
              <button
                onClick={() => handleCreateRoom('black')}
                className="w-full p-3 border-2 border-[#2d3436] font-bold text-white bg-[#2d3436] hover:bg-[#636e72] transition-colors flex items-center gap-3"
              >
                <span className="w-6 h-6 rounded-full bg-[#2d3436] border-2 border-white" />
                Play as Black
              </button>
              <button
                onClick={() => handleCreateRoom('spectator')}
                className="w-full p-3 border-2 border-[#2d3436] font-bold text-[#2d3436] bg-[#dfe6e9] hover:bg-[#b2bec3] transition-colors flex items-center gap-3"
              >
                <Eye size={24} />
                Watch as Spectator
              </button>
            </div>
            <button
              onClick={() => setShowSeatModal(false)}
              className="w-full mt-4 p-2 border-2 border-[#2d3436] font-bold text-[#636e72] hover:bg-[#f8f9fa] transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
