import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white border-4 border-[#2d3436] shadow-[8px_8px_0px_#2d3436] p-8">
          <h1 className="text-4xl font-black text-[#2d3436] mb-2 text-center">
            CUSTOMCHESS
          </h1>
          <p className="text-[#2d3436] text-center mb-8 font-medium">
            A customizable chess game   engine
          </p>

          <div className="space-y-4">
            <Link
              to="/singleplayer"
              className="block w-full bg-[#ff6b6b] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4 text-center font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all"
            >
              PLAY VS AI
            </Link>

            <Link
              to="/multiplayer"
              className="block w-full bg-[#4ecdc4] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4 text-center font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all"
            >
              PLAY ONLINE
            </Link>

            <Link
              to="/editor"
              className="block w-full bg-[#ffe66d] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4 text-center font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all"
            >
              BOARD EDITOR
            </Link>
          </div>
        </div>

        <p className="text-center text-sm text-[#636e72] mt-4">
          Built by Mason Liebe
        </p>
      </div>
    </div>
  );
}
