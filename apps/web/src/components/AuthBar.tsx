import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { User, LogOut, LogIn, UserPlus, Info, X } from 'lucide-react';

export function AuthBar() {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const [showAbout, setShowAbout] = useState(false);

  // Don't show on login/register pages
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <>
      <div className="fixed top-0 right-0 z-40 p-2">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowAbout(true)}
            className="flex items-center justify-center text-xs font-bold text-[#636e72] bg-white/90 w-7 h-7 border border-[#2d3436] hover:bg-[#dfe6e9] hover:text-[#2d3436] transition-colors"
            title="About this site"
          >
            <Info size={14} />
          </button>
          {user ? (
            <>
              <Link
                to="/account"
                className="flex items-center gap-1.5 text-xs font-bold text-[#2d3436] bg-white/90 px-2 py-1 border border-[#2d3436] hover:bg-[#dfe6e9] transition-colors"
              >
                <User size={12} />
                {user.username}
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-1 text-xs font-bold text-[#636e72] bg-white/90 px-2 py-1 border border-[#2d3436] hover:bg-[#ff6b6b] hover:text-[#2d3436] transition-colors"
              >
                <LogOut size={12} />
                LOGOUT
              </button>
            </>
          ) : (
            <>
              <Link
                to={`/login?redirect=${encodeURIComponent(location.pathname)}`}
                className="flex items-center gap-1 text-xs font-bold text-[#2d3436] bg-white/90 px-2 py-1 border border-[#2d3436] hover:bg-[#4ecdc4] transition-colors"
              >
                <LogIn size={12} />
                LOG IN
              </Link>
              <Link
                to={`/register?redirect=${encodeURIComponent(location.pathname)}`}
                className="flex items-center gap-1 text-xs font-bold text-[#2d3436] bg-[#a29bfe]/90 px-2 py-1 border border-[#2d3436] hover:brightness-95 transition-colors"
              >
                <UserPlus size={12} />
                REGISTER
              </Link>
            </>
          )}
        </div>
      </div>

      {/* About Modal */}
      {showAbout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white border-4 border-[#2d3436] shadow-[8px_8px_0px_#2d3436] max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b-4 border-[#2d3436]">
              <h2 className="text-xl font-black text-[#2d3436]">ABOUT THIS SITE</h2>
              <button
                onClick={() => setShowAbout(false)}
                className="w-10 h-10 bg-[#ff6b6b] border-2 border-[#2d3436] font-bold text-xl hover:bg-red-400 transition-colors flex items-center justify-center"
              >
                <X size={20} strokeWidth={3} />
              </button>
            </div>
            <div className="p-4 space-y-4 text-[#2d3436]">
              <p className="font-medium">
                CustomChess is a chess variant engine supporting arbitrary board
                dimensions (up to 16x16), custom piece movement patterns, and
                configurable tile layouts with disableable squares.
              </p>

              <div>
                <h3 className="font-black text-sm mb-1">CHESS ENGINE (RUST / WASM)</h3>
                <p className="text-sm text-[#636e72]">
                  The core engine is written in Rust and compiled to WebAssembly
                  via wasm-bindgen, running entirely in the browser. Board state
                  is represented using 256-bit bitboards (via numext-fixed-uint
                  U256) to support up to 16x16 grids. The AI uses negamax search
                  with alpha-beta pruning, iterative deepening, and principal
                  variation search (PVS). Pruning is accelerated by null move
                  pruning (R=3), late move reductions, and a 1.5M-entry
                  transposition table with 4-way clustering and Zobrist hashing.
                  Move ordering uses killer moves (2 per ply), history heuristic
                  tables, and static exchange evaluation (SEE) for captures.
                  Quiescence search prevents horizon-effect blunders. Positional
                  evaluation uses dynamically generated piece-square tables based
                  on mobility, with endgame-aware king centralization.
                </p>
              </div>

              <div>
                <h3 className="font-black text-sm mb-1">FRONTEND</h3>
                <p className="text-sm text-[#636e72]">
                  Built with React 19 and TypeScript, bundled with Vite 7 using
                  vite-plugin-wasm and vite-plugin-top-level-await for async WASM
                  initialization. The board is rendered as absolutely-positioned
                  DOM elements with SVG piece images, supporting both
                  click-to-move and HTML5 drag-and-drop interactions. State
                  management uses Zustand stores for game state and editor state.
                  Styled with Tailwind CSS 4 in a neobrutalist design system.
                </p>
              </div>

              <div>
                <h3 className="font-black text-sm mb-1">MULTIPLAYER</h3>
                <p className="text-sm text-[#636e72]">
                  The backend is an async Rust server built on Axum 0.7 with
                  Tokio, serving WebSocket connections at /ws. Rooms are managed
                  as independent Tokio tasks communicating via mpsc channels, with
                  JSON-serialized tagged-union messages (serde) for the
                  client-server protocol. Room IDs are generated using
                  adjective-adjective-animal naming. The client auto-reconnects on
                  disconnect with a 2-second retry and buffers outbound messages
                  while disconnected. Deployed via a multi-stage Docker build
                  (node:20-alpine for the frontend, rust:1.75-alpine for the
                  server, alpine:latest for runtime).
                </p>
              </div>

              <div>
                <h3 className="font-black text-sm mb-1">BOARD EDITOR</h3>
                <p className="text-sm text-[#636e72]">
                  The editor supports custom board dimensions (4x4 to 16x16),
                  per-tile enable/disable toggling, and up to 9 custom piece types
                  with fully configurable movement patterns. Movement patterns
                  define independent attack and translate capabilities across 8
                  sliding directions plus arbitrary jump deltas on a configurable
                  grid. Board configurations are serializable as JSON GameState
                  objects and can be exported/imported or used to create
                  multiplayer rooms. Includes 6 prebuilt variants: Standard, Mini
                  (6x6), Micro (4x5), Big (10x10), Holy (with disabled tiles),
                  and Pawn Storm.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
