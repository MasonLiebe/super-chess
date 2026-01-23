import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGameStore } from '../stores/gameStore';
import { useWebSocket } from '../hooks/useWebSocket';
import { DEFAULT_GAME_STATE } from '../lib/constants';

export function Multiplayer() {
  const navigate = useNavigate();
  const { sendMessage } = useWebSocket();
  const { connected, roomList, currentRoom } = useGameStore();

  // Request room list on mount
  useEffect(() => {
    if (connected) {
      sendMessage({ type: 'ListRooms' });
    }
  }, [connected, sendMessage]);

  // Navigate to room when we join one
  useEffect(() => {
    if (currentRoom) {
      navigate(`/room/${currentRoom}`);
    }
  }, [currentRoom, navigate]);

  const handleCreateRoom = () => {
    sendMessage({
      type: 'CreateRoom',
      content: {
        allow_edits: true,
        is_public: true,
        init_game_state: DEFAULT_GAME_STATE,
      },
    });
  };

  const handleJoinRoom = (roomId: string) => {
    sendMessage({
      type: 'JoinRoom',
      content: roomId,
    });
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            className="bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] px-4 py-2 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all"
          >
            BACK
          </Link>
          <h1 className="text-2xl font-black text-[#2d3436]">ONLINE PLAY</h1>
          <div className="w-20" />
        </div>

        {/* Connection status */}
        <div
          className={`mb-6 p-3 border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] font-bold ${
            connected ? 'bg-[#4ecdc4]' : 'bg-[#ff6b6b]'
          }`}
        >
          {connected ? 'CONNECTED' : 'CONNECTING...'}
        </div>

        {/* Create room button */}
        <button
          onClick={handleCreateRoom}
          disabled={!connected}
          className="w-full mb-6 bg-[#ffe66d] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0px_#2d3436]"
        >
          CREATE NEW ROOM
        </button>

        {/* Room list */}
        <div className="bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436]">
          <div className="p-4 border-b-4 border-[#2d3436]">
            <h2 className="font-bold text-[#2d3436]">PUBLIC ROOMS</h2>
          </div>

          {roomList.length === 0 ? (
            <div className="p-8 text-center text-[#636e72]">
              No public rooms available. Create one!
            </div>
          ) : (
            <div className="divide-y-4 divide-[#2d3436]">
              {roomList.map((room) => (
                <div
                  key={room.room_id}
                  className="p-4 flex items-center justify-between hover:bg-[#f8f9fa] transition-colors"
                >
                  <div>
                    <p className="font-bold text-[#2d3436]">{room.room_id}</p>
                    <p className="text-sm text-[#636e72]">
                      {room.num_clients} player{room.num_clients !== 1 ? 's' : ''} •{' '}
                      {room.editable ? 'Editable' : 'Locked'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleJoinRoom(room.room_id)}
                    className="bg-[#4ecdc4] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] px-4 py-2 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all"
                  >
                    JOIN
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
