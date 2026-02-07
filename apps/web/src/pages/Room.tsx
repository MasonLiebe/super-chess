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
    <div className="min-h-screen bg-[var(--bg-page)] p-4 flex flex-col justify-center">
      <div className="max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleLeaveRoom}
            className="flex items-center gap-1.5 bg-[var(--bg-card)] border-4 border-[var(--border-color)] shadow-[4px_4px_0px_var(--shadow-color)] px-4 py-2 font-bold text-[var(--text-primary)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_var(--shadow-color)] transition-all"
          >
            <ArrowLeft size={18} strokeWidth={3} />
            LEAVE
          </button>
          <h1 className="text-xl font-black text-[var(--text-primary)] truncate max-w-[200px]">
            {roomId || 'Loading...'}
          </h1>
          <button
            onClick={toggleSound}
            className="bg-[var(--bg-card)] border-4 border-[var(--border-color)] shadow-[4px_4px_0px_var(--shadow-color)] px-3 py-2 font-bold text-[var(--text-primary)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_var(--shadow-color)] transition-all"
            title={soundEnabled ? 'Mute sounds' : 'Unmute sounds'}
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeOff size={18} />}
          </button>
        </div>

        {/* Game area */}
        <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">
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
              />
            ) : (
              <div className="w-full aspect-square max-w-[560px] bg-[var(--bg-card)] border-4 border-[var(--border-color)] shadow-[4px_4px_0px_var(--shadow-color)] lg:shadow-[8px_8px_0px_var(--shadow-color)] flex items-center justify-center">
                <p className="font-bold text-[var(--text-secondary)]">Loading game...</p>
              </div>
            )}
          </div>

          {/* Side panel */}
          <div className="w-full lg:w-72 space-y-4">
            {/* Status */}
            <div
              className={`p-4 border-4 border-[var(--border-color)] shadow-[4px_4px_0px_var(--shadow-color)] ${
                gameInfo?.winner
                  ? 'bg-[#ffe66d]'
                  : isMyTurn
                  ? 'bg-[#4ecdc4]'
                  : 'bg-[var(--bg-card)]'
              }`}
            >
              <h2 className="font-bold text-[var(--color-dark)] mb-1">STATUS</h2>
              {gameInfo?.winner ? (
                <p className="text-[var(--color-dark)]">
                  <span className="font-bold">{gameInfo.winner}</span> wins!
                </p>
              ) : gameInfo?.to_move_in_check ? (
                <p className="text-[#ff6b6b] font-bold">CHECK!</p>
              ) : isMyTurn ? (
                <p className="text-[var(--color-dark)] font-bold">Your turn</p>
              ) : (
                <p className="text-[var(--text-secondary)]">Waiting for opponent...</p>
              )}
            </div>

            {/* Seat Selection */}
            <div className="bg-[var(--bg-card)] border-4 border-[var(--border-color)] shadow-[4px_4px_0px_var(--shadow-color)] p-4">
              <h2 className="font-bold text-[var(--text-primary)] mb-3">YOUR SEAT</h2>
              {playerList ? (
                <div className="flex gap-2">
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
                        className={`flex-1 p-2 border-2 border-[var(--border-color)] font-bold text-xs transition-colors ${
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
                        <span className="flex justify-center mb-1">
                          {seat === 'white' ? (
                            <span className="w-4 h-4 rounded-full bg-white border-2 border-[#2d3436]" />
                          ) : seat === 'black' ? (
                            <span className="w-4 h-4 rounded-full bg-[#2d3436]" />
                          ) : (
                            <Eye size={16} />
                          )}
                        </span>
                        {seat.toUpperCase()}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className="text-[var(--text-secondary)]">Loading...</p>
              )}
            </div>

            {/* Players */}
            <div className="bg-[var(--bg-card)] border-4 border-[var(--border-color)] shadow-[4px_4px_0px_var(--shadow-color)] p-4">
              <h2 className="font-bold text-[var(--text-primary)] mb-2">PLAYERS</h2>
              {playerList ? (
                <ul className="space-y-2">
                  {playerList.players.map((player) => (
                    <li
                      key={player.name}
                      className={`flex items-center gap-2 ${
                        player.name === playerList.you ? 'font-bold' : ''
                      }`}
                    >
                      {player.seat === 'spectator' ? (
                        <Eye size={12} className="text-[var(--text-secondary)]" />
                      ) : (
                        <span
                          className={`w-3 h-3 rounded-full ${
                            player.seat === 'white'
                              ? 'bg-white border-2 border-[#2d3436]'
                              : 'bg-[#2d3436]'
                          }`}
                        />
                      )}
                      <span className="truncate flex-1">
                        {player.name}
                        {player.name === playerList.you && ' (you)'}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[var(--text-secondary)]">Loading...</p>
              )}
            </div>

            {/* Share link */}
            <div className="bg-[var(--bg-card-hover)] border-4 border-[var(--border-color)] shadow-[4px_4px_0px_var(--shadow-color)] p-4">
              <h2 className="flex items-center gap-1.5 font-bold text-[var(--text-primary)] mb-2">
                <Share2 size={16} strokeWidth={3} />
                SHARE
              </h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={window.location.href}
                  className="flex-1 min-w-0 p-2 text-sm text-[var(--text-secondary)] bg-[var(--bg-card)] border-2 border-[var(--border-color)] truncate"
                  onClick={(e) => (e.target as HTMLInputElement).select()}
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 bg-[#4ecdc4] border-2 border-[var(--border-color)] font-bold text-sm text-[var(--color-dark)] hover:bg-[#45b7aa] transition-colors whitespace-nowrap"
                >
                  {copied ? <><Check size={14} strokeWidth={3} /> COPIED!</> : <><Copy size={14} strokeWidth={3} /> COPY</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
