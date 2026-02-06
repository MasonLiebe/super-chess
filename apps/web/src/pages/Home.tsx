import { Link } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { Swords, Globe, PencilRuler, Compass, Crown, LogIn, UserPlus, User } from 'lucide-react';

export function Home() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white border-4 border-[#2d3436] shadow-[8px_8px_0px_#2d3436] p-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Crown size={36} strokeWidth={2.5} className="text-[#2d3436]" />
            <h1 className="text-4xl font-black text-[#2d3436]">
              CUSTOMCHESS
            </h1>
          </div>
          <p className="text-[#2d3436] text-center mb-8 font-medium">
            A customizable chess game engine
          </p>

          <div className="space-y-4">
            <Link
              to="/singleplayer"
              className="flex items-center justify-center gap-2.5 w-full bg-[#ff6b6b] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all"
            >
              <Swords size={20} strokeWidth={2.5} />
              PLAY VS AI
            </Link>

            <Link
              to="/multiplayer"
              className="flex items-center justify-center gap-2.5 w-full bg-[#4ecdc4] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all"
            >
              <Globe size={20} strokeWidth={2.5} />
              PLAY ONLINE
            </Link>

            <Link
              to="/editor"
              className="flex items-center justify-center gap-2.5 w-full bg-[#ffe66d] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all"
            >
              <PencilRuler size={20} strokeWidth={2.5} />
              BOARD EDITOR
            </Link>

            <Link
              to="/browse"
              className="flex items-center justify-center gap-2.5 w-full bg-[#a29bfe] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all"
            >
              <Compass size={20} strokeWidth={2.5} />
              BROWSE VARIANTS
            </Link>
          </div>

          {/* Auth section */}
          <div className="mt-6 pt-5 border-t-2 border-[#dfe6e9]">
            {user ? (
              <div className="flex items-center justify-center gap-2 text-[#2d3436]">
                <User size={18} className="text-[#636e72]" />
                <span className="font-medium text-sm">
                  Signed in as <span className="font-bold">{user.username}</span>
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 flex-1 bg-white border-3 border-[#2d3436] shadow-[3px_3px_0px_#2d3436] p-3 font-bold text-sm text-[#2d3436] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1.5px_1.5px_0px_#2d3436] transition-all"
                >
                  <LogIn size={16} />
                  LOG IN
                </Link>
                <Link
                  to="/register"
                  className="flex items-center justify-center gap-2 flex-1 bg-[#a29bfe] border-3 border-[#2d3436] shadow-[3px_3px_0px_#2d3436] p-3 font-bold text-sm text-[#2d3436] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1.5px_1.5px_0px_#2d3436] transition-all"
                >
                  <UserPlus size={16} />
                  SIGN UP
                </Link>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-sm text-[#636e72] mt-4">
          Built by Mason Liebe
        </p>
      </div>
    </div>
  );
}
