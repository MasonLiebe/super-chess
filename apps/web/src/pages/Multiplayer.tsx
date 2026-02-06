import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGameStore } from '../stores/gameStore';
import { useWebSocket } from '../contexts/WebSocketContext';
import { ArrowLeft, Plus, DoorOpen } from 'lucide-react';

export function Multiplayer() {
  const navigate = useNavigate();
  const { sendMessage } = useWebSocket();
  const { connected, roomList } = useGameStore();

  // Request room list on mount
  useEffect(() => {
    if (connected) {
      sendMessage({ type: 'ListRooms' });
    }
  }, [connected, sendMessage]);

  const handleJoinRoom = (roomId: string) => {
    // Navigate to the room page - Room component will send the JoinRoom message
    navigate(`/room/${roomId}`);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            className="flex items-center gap-1.5 bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] px-4 py-2 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all"
          >
            <ArrowLeft size={18} strokeWidth={3} />
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
        <Link
          to="/create-room"
          className={`block w-full mb-6 bg-[#ffe66d] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4 font-bold text-[#2d3436] text-center hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all ${
            !connected ? 'opacity-50 pointer-events-none' : ''
          }`}
        >
          <span className="flex items-center justify-center gap-2"><Plus size={18} strokeWidth={3} /> CREATE NEW ROOM</span>
        </Link>

        {/* Room list */}
        <div className="bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436]">
          <div className="p-4 border-b-4 border-[#2d3436]">
            <h2 className="font-bold text-[#2d3436]">PUBLIC ROOMS</h2>
          </div>

          {roomList.length === 0 ? (
            <div className="p-8 text-center text-[#636e72]">
              <DoorOpen size={32} className="mx-auto mb-2 text-[#b2bec3]" />
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
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-[#636e72]">
                        {room.num_clients} player{room.num_clients !== 1 ? 's' : ''}
                      </span>
                      <span className="flex items-center gap-1">
                        <span
                          className={`inline-block w-3 h-3 rounded-full border border-[#2d3436] ${
                            room.white_taken ? 'bg-[#ff6b6b]' : 'bg-white'
                          }`}
                          title={room.white_taken ? 'White taken' : 'White available'}
                        />
                        <span
                          className={`inline-block w-3 h-3 rounded-full border border-[#2d3436] ${
                            room.black_taken ? 'bg-[#ff6b6b]' : 'bg-[#2d3436]'
                          }`}
                          title={room.black_taken ? 'Black taken' : 'Black available'}
                        />
                      </span>
                      {!room.white_taken && !room.black_taken && (
                        <span className="text-[#4ecdc4] font-medium">Both seats open!</span>
                      )}
                      {(room.white_taken && !room.black_taken) && (
                        <span className="text-[#636e72]">Black open</span>
                      )}
                      {(!room.white_taken && room.black_taken) && (
                        <span className="text-[#636e72]">White open</span>
                      )}
                      {room.white_taken && room.black_taken && (
                        <span className="text-[#636e72]">Spectate only</span>
                      )}
                    </div>
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
