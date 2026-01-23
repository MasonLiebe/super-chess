import { useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Board } from '../components/chess/Board';
import { useGameStore } from '../stores/gameStore';
import { useWebSocket } from '../hooks/useWebSocket';

export function Room() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { sendMessage } = useWebSocket();
  const { gameInfo, playerList, currentRoom, reset } = useGameStore();

  // Join room if not already in one
  useEffect(() => {
    if (roomId && !currentRoom) {
      sendMessage({
        type: 'JoinRoom',
        content: roomId,
      });
    }
  }, [roomId, currentRoom, sendMessage]);

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
        content: {
          from,
          to,
          promoteTo: null,
        },
      });
    },
    [sendMessage]
  );

  const isMyTurn = gameInfo && playerList && gameInfo.state.toMove === playerList.player_num;
  const flipped = playerList?.player_num === 1;

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleLeaveRoom}
            className="bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] px-4 py-2 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all"
          >
            LEAVE
          </button>
          <h1 className="text-xl font-black text-[#2d3436] truncate max-w-[200px]">
            {roomId || 'Loading...'}
          </h1>
          <div className="w-20" />
        </div>

        {/* Game area */}
        <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">
          {/* Board */}
          <div className="flex-shrink-0">
            {gameInfo ? (
              <Board
                gameState={gameInfo.state}
                playerNum={playerList?.player_num ?? 0}
                flipped={flipped}
                lastTurn={gameInfo.last_turn}
                inCheckKings={gameInfo.in_check_kings}
                onRequestMoves={handleRequestMoves}
                onMove={handleMove}
                disabled={!isMyTurn}
              />
            ) : (
              <div className="w-[600px] h-[600px] bg-white border-4 border-[#2d3436] shadow-[8px_8px_0px_#2d3436] flex items-center justify-center">
                <p className="font-bold text-[#636e72]">Loading game...</p>
              </div>
            )}
          </div>

          {/* Side panel */}
          <div className="w-full lg:w-72 space-y-4">
            {/* Status */}
            <div
              className={`p-4 border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] ${
                gameInfo?.winner
                  ? 'bg-[#ffe66d]'
                  : isMyTurn
                  ? 'bg-[#4ecdc4]'
                  : 'bg-white'
              }`}
            >
              <h2 className="font-bold text-[#2d3436] mb-1">STATUS</h2>
              {gameInfo?.winner ? (
                <p className="text-[#2d3436]">
                  <span className="font-bold">{gameInfo.winner}</span> wins!
                </p>
              ) : gameInfo?.to_move_in_check ? (
                <p className="text-[#ff6b6b] font-bold">CHECK!</p>
              ) : isMyTurn ? (
                <p className="text-[#2d3436] font-bold">Your turn</p>
              ) : (
                <p className="text-[#636e72]">Waiting for opponent...</p>
              )}
            </div>

            {/* Players */}
            <div className="bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4">
              <h2 className="font-bold text-[#2d3436] mb-2">PLAYERS</h2>
              {playerList ? (
                <ul className="space-y-2">
                  {playerList.names.map((name, i) => (
                    <li
                      key={i}
                      className={`flex items-center gap-2 ${
                        name === playerList.you ? 'font-bold' : ''
                      }`}
                    >
                      <span
                        className={`w-3 h-3 rounded-full ${
                          i === 0 ? 'bg-white border-2 border-[#2d3436]' : 'bg-[#2d3436]'
                        }`}
                      />
                      <span className="truncate">
                        {name}
                        {name === playerList.you && ' (you)'}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[#636e72]">Loading...</p>
              )}
            </div>

            {/* Share link */}
            <div className="bg-[#f8f9fa] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4">
              <h2 className="font-bold text-[#2d3436] mb-2">SHARE</h2>
              <p className="text-sm text-[#636e72] break-all">
                {window.location.href}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
