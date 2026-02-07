import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Board } from '../components/chess/Board';
import { useGameStore } from '../stores/gameStore';
import { useWebSocket } from '../contexts/WebSocketContext';
import { toRustTurn } from '../lib/convert';
import { playMoveSound, playCaptureSound, playCheckSound, playGameOverSound } from '../lib/sounds';
import { useSettingsStore } from '../stores/settingsStore';
import { ArrowLeft, Volume2, VolumeOff, Copy, Check, Eye, Share2 } from 'lucide-react';
import type { GameInfo, Seat } from '../types/chess';

export function Room() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { sendMessage } = useWebSocket();
  const { gameInfo, playerList, currentRoom, reset } = useGameStore();
  const prevGameInfoRef = useRef<GameInfo | null>(null);
  const [copied, setCopied] = useState(false);
  const { soundEnabled, toggleSound } = useSettingsStore();

  // Join room if not already in one (default to spectator, user can switch seats once in)
  useEffect(() => {
    if (roomId && !currentRoom) {
      sendMessage({
        type: 'JoinRoom',
        content: {
          room_id: roomId,
          seat: 'spectator',
        },
      });
    }
  }, [roomId, currentRoom, sendMessage]);

  // Handle seat selection
  const handleSelectSeat = useCallback(
    (seat: Seat) => {
      sendMessage({
        type: 'SelectSeat',
        content: seat,
      });
    },
    [sendMessage]
  );

  // Play sounds when game state changes
  useEffect(() => {
    if (!gameInfo) return;

    const prevGameInfo = prevGameInfoRef.current;

    // Check if a move was made (turn changed)
    if (prevGameInfo && prevGameInfo.state.toMove !== gameInfo.state.toMove) {
      // Check for game over
      if (gameInfo.winner) {
        // Determine if we won
        const didWin = playerList && gameInfo.winner === playerList.you;
        playGameOverSound(didWin ?? false);
      } else if (gameInfo.to_move_in_check) {
        playCheckSound();
      } else {
        // Check if it was a capture (piece count decreased)
        const prevPieceCount = prevGameInfo.state.pieces.length;
        const currPieceCount = gameInfo.state.pieces.length;
        if (currPieceCount < prevPieceCount) {
          playCaptureSound();
        } else {
          playMoveSound();
        }
      }
    }

    prevGameInfoRef.current = gameInfo;
  }, [gameInfo, playerList]);

  const handleLeaveRoom = useCallback(() => {
    sendMessage({ type: 'LeaveRoom' });
    reset();
    navigate('/multiplayer');
  }, [sendMessage, reset, navigate]);

  const handleRequestMoves = useCallback(
    (x: number, y: number) => {
      sendMessage({
        type: 'MovesFrom',
        content: [x, y],
      });
    },
    [sendMessage]
  );

  const handleMove = useCallback(
    (from: [number, number], to: [number, number]) => {
      sendMessage({
        type: 'TakeTurn',
        // Convert to Rust snake_case format
        content: toRustTurn({
          from,
          to,
          promoteTo: null,
        }),
      });
    },
    [sendMessage]
  );

  // Determine if it's your turn based on seat
  const isMyTurn =
    gameInfo &&
    playerList &&
    ((playerList.your_seat === 'white' && gameInfo.state.toMove === 0) ||
      (playerList.your_seat === 'black' && gameInfo.state.toMove === 1));
  const flipped = playerList?.your_seat === 'black';

  return (
    <div className="h-screen bg-[var(--bg-page)] px-4 pb-4 pt-12 flex flex-col">
      <div className="mx-auto w-full max-w-5xl flex-1 min-h-0 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4 shrink-0">
          <button
            onClick={handleLeaveRoom}
            className="flex items-center justify-center bg-[var(--bg-card)] border-4 border-[var(--border-color)] shadow-[4px_4px_0px_var(--shadow-color)] w-10 h-10 font-bold text-[var(--text-primary)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_var(--shadow-color)] transition-all"
            title="Leave room"
          >
            <ArrowLeft size={18} strokeWidth={3} />
          </button>
          <h1 className="text-lg sm:text-2xl font-black text-[var(--text-primary)] flex-1 text-center truncate">
            {roomId || 'Loading...'}
          </h1>
          <button
            onClick={toggleSound}
            className="flex items-center justify-center bg-[var(--bg-card)] border-4 border-[var(--border-color)] shadow-[4px_4px_0px_var(--shadow-color)] w-10 h-10 font-bold text-[var(--text-primary)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_var(--shadow-color)] transition-all"
            title={soundEnabled ? 'Mute sounds' : 'Unmute sounds'}
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeOff size={18} />}
          </button>
        </div>

        {/* Game area */}
        <div className="flex flex-1 min-h-0 flex-col lg:flex-row gap-4 lg:gap-6 lg:items-center lg:justify-center">
          {/* Board */}
          <div className="flex-shrink-0 w-full max-w-[560px] mx-auto lg:mx-0">
            {gameInfo ? (
              <Board
                gameState={gameInfo.state}
                playerNum={playerList?.your_seat === 'black' ? 1 : 0}
                flipped={flipped}
                lastTurn={gameInfo.last_turn}
                inCheckKings={gameInfo.in_check_kings}
                onRequestMoves={handleRequestMoves}
                onMove={handleMove}
                disabled={!isMyTurn}
                reservedHeight={{ mobile: 300, desktop: 130 }}
              />
            ) : (
              <div className="w-full aspect-square max-w-[560px] bg-[var(--bg-card)] border-4 border-[var(--border-color)] shadow-[4px_4px_0px_var(--shadow-color)] lg:shadow-[8px_8px_0px_var(--shadow-color)] flex items-center justify-center">
                <p className="font-bold text-[var(--text-secondary)]">Loading game...</p>
              </div>
            )}
          </div>

          {/* Side panel */}
          <div className="w-full lg:w-72 space-y-2 lg:space-y-4">
            {/* Status */}
            <div
              className={`px-3 py-2 lg:p-4 border-2 lg:border-4 border-[var(--border-color)] shadow-[2px_2px_0px_var(--shadow-color)] lg:shadow-[4px_4px_0px_var(--shadow-color)] ${
                gameInfo?.winner
                  ? 'bg-[#ffe66d]'
                  : isMyTurn
                  ? 'bg-[#4ecdc4]'
                  : 'bg-[var(--bg-card)]'
              }`}
            >
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-[var(--color-dark)] text-xs lg:text-sm">STATUS</h2>
                <span className="text-[var(--color-dark)] text-xs lg:text-sm">
                  {gameInfo?.winner ? (
                    <><span className="font-bold">{gameInfo.winner}</span> wins!</>
                  ) : gameInfo?.to_move_in_check ? (
                    <span className="text-[#ff6b6b] font-bold">CHECK!</span>
                  ) : isMyTurn ? (
                    <span className="font-bold">Your turn</span>
                  ) : playerList?.your_seat === 'spectator' ? (
                    <span className="text-[var(--text-secondary)]">{gameInfo?.state.toMove === 0 ? 'White' : 'Black'} to move</span>
                  ) : (
                    <span className="text-[var(--text-secondary)]">Waiting for opponent...</span>
                  )}
                </span>
              </div>
            </div>

            {/* Seat + Players combined */}
            <div className="bg-[var(--bg-card)] border-2 lg:border-4 border-[var(--border-color)] shadow-[2px_2px_0px_var(--shadow-color)] lg:shadow-[4px_4px_0px_var(--shadow-color)] p-2 lg:p-4 space-y-2 lg:space-y-3">
              {/* Seat Selection */}
              <div>
                <h2 className="font-bold text-[var(--text-primary)] text-xs lg:text-sm mb-1.5 lg:mb-2">YOUR SEAT</h2>
                {playerList ? (
                  <div className="flex gap-1.5 lg:gap-2">
                    {(['white', 'black', 'spectator'] as Seat[]).map((seat) => {
                      const isYourSeat = playerList.your_seat === seat;
                      const isTaken =
                        seat !== 'spectator' &&
                        playerList.players.some((p) => p.seat === seat && p.name !== playerList.you);
                      return (
                        <button
                          key={seat}
                          onClick={() => !isTaken && handleSelectSeat(seat)}
                          disabled={isTaken}
                          className={`flex-1 p-1.5 lg:p-2 border-2 border-[var(--border-color)] font-bold text-[10px] lg:text-xs transition-colors ${
                            isYourSeat
                              ? seat === 'white'
                                ? 'bg-white text-[#2d3436] ring-2 ring-[#4ecdc4]'
                                : seat === 'black'
                                ? 'bg-[#2d3436] text-white ring-2 ring-[#4ecdc4]'
                                : 'bg-[#4ecdc4] text-[var(--color-dark)]'
                              : isTaken
                              ? 'bg-[#ff6b6b] text-white cursor-not-allowed opacity-60'
                              : 'bg-[var(--divider)] text-[var(--text-secondary)] hover:bg-[var(--text-muted)]'
                          }`}
                        >
                          <span className="flex justify-center mb-0.5 lg:mb-1">
                            {seat === 'white' ? (
                              <span className="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-white border-2 border-[#2d3436]" />
                            ) : seat === 'black' ? (
                              <span className="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-[#2d3436]" />
                            ) : (
                              <Eye size={14} />
                            )}
                          </span>
                          {seat.toUpperCase()}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-[var(--text-secondary)]">Loading...</p>
                )}
              </div>

              {/* Divider */}
              <div className="border-t-2 border-[var(--divider)]" />

              {/* Players */}
              <div>
                <h2 className="font-bold text-[var(--text-primary)] text-xs lg:text-sm mb-1 lg:mb-2">PLAYERS</h2>
                {playerList ? (
                  <ul className="space-y-1 lg:space-y-1.5">
                    {playerList.players.map((player) => (
                      <li
                        key={player.name}
                        className={`flex items-center gap-2 text-xs lg:text-sm ${
                          player.name === playerList.you ? 'font-bold' : ''
                        }`}
                      >
                        {player.seat === 'spectator' ? (
                          <Eye size={10} className="text-[var(--text-secondary)] flex-shrink-0" />
                        ) : (
                          <span
                            className={`w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full flex-shrink-0 ${
                              player.seat === 'white'
                                ? 'bg-white border-2 border-[#2d3436]'
                                : 'bg-[#2d3436]'
                            }`}
                          />
                        )}
                        <span className="truncate flex-1 text-[var(--text-primary)]">
                          {player.name}
                          {player.name === playerList.you && ' (you)'}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-[var(--text-secondary)]">Loading...</p>
                )}
              </div>
            </div>

            {/* Share link */}
            <div className="bg-[var(--bg-card)] border-2 lg:border-4 border-[var(--border-color)] shadow-[2px_2px_0px_var(--shadow-color)] lg:shadow-[4px_4px_0px_var(--shadow-color)] p-2 lg:p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={window.location.href}
                  className="flex-1 min-w-0 p-1.5 lg:p-2 text-[10px] lg:text-sm text-[var(--text-secondary)] bg-[var(--bg-card)] border lg:border-2 border-[var(--border-color)] truncate"
                  onClick={(e) => (e.target as HTMLInputElement).select()}
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="flex items-center gap-1 px-2 py-1.5 lg:px-3 lg:py-2 bg-[#4ecdc4] border lg:border-2 border-[var(--border-color)] font-bold text-[10px] lg:text-sm text-[var(--color-dark)] hover:brightness-95 transition-colors whitespace-nowrap flex-shrink-0"
                >
                  {copied ? <><Check size={12} strokeWidth={3} /> COPIED</> : <><Share2 size={12} strokeWidth={3} /> SHARE</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
