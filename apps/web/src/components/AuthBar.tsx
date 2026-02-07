import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useSettingsStore } from '../stores/settingsStore';
import { User, LogOut, LogIn, UserPlus, Info, X, Moon, Sun } from 'lucide-react';

export function AuthBar() {
  const { user, logout } = useAuthStore();
  const { darkMode, toggleDarkMode } = useSettingsStore();
  const location = useLocation();
  const [showAbout, setShowAbout] = useState(false);

  // Don't show on login/register pages
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <>
      {/* Dark mode toggle - top left */}
      <div className="fixed top-0 left-0 z-40 p-1.5 sm:p-2">
        <button
          onClick={toggleDarkMode}
          className="flex items-center justify-center text-xs font-bold w-6 h-6 sm:w-7 sm:h-7 border transition-colors"
          style={{
            color: 'var(--text-secondary)',
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-color)',
          }}
          title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? <Sun size={12} /> : <Moon size={12} />}
        </button>
      </div>

      <div className="fixed top-0 right-0 z-40 p-1.5 sm:p-2">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowAbout(true)}
            className="flex items-center justify-center text-xs font-bold w-6 h-6 sm:w-7 sm:h-7 border transition-colors"
            style={{
              color: 'var(--text-secondary)',
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-color)',
            }}
            title="About this site"
          >
            <Info size={12} />
          </button>
          {user ? (
            <>
              <Link
                to="/account"
                className="flex items-center gap-1 text-[10px] sm:text-xs font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 border transition-colors"
                style={{
                  color: 'var(--text-primary)',
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-color)',
                }}
              >
                <User size={11} />
                <span className="hidden sm:inline">{user.username}</span>
              </Link>
              <button
                onClick={logout}
                className="flex items-center justify-center text-xs font-bold w-6 h-6 sm:w-auto sm:h-auto sm:px-2 sm:py-1 border hover:bg-[#ff6b6b] transition-colors"
                style={{
                  color: 'var(--text-secondary)',
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-color)',
                }}
                title="Log out"
              >
                <LogOut size={11} />
                <span className="hidden sm:inline sm:ml-1">LOGOUT</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to={`/login?redirect=${encodeURIComponent(location.pathname)}`}
                className="flex items-center justify-center text-xs font-bold w-6 h-6 sm:w-auto sm:h-auto sm:px-2 sm:py-1 border hover:bg-[#4ecdc4] transition-colors"
                style={{
                  color: 'var(--text-primary)',
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-color)',
                }}
                title="Log in"
              >
                <LogIn size={11} />
                <span className="hidden sm:inline sm:ml-1">LOG IN</span>
              </Link>
              <Link
                to={`/register?redirect=${encodeURIComponent(location.pathname)}`}
                className="flex items-center justify-center text-xs font-bold text-[var(--color-dark)] bg-[#a29bfe]/90 w-6 h-6 sm:w-auto sm:h-auto sm:px-2 sm:py-1 border border-[var(--border-color)] hover:brightness-95 transition-colors"
                title="Register"
              >
                <UserPlus size={11} />
                <span className="hidden sm:inline sm:ml-1">REGISTER</span>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* About Modal */}
      {showAbout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div
            className="border-4 shadow-[8px_8px_0px] max-w-md w-full max-h-[90vh] overflow-y-auto"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-color)',
              boxShadow: '8px 8px 0px var(--shadow-color)',
            }}
          >
            <div
              className="flex items-center justify-between p-4 border-b-4"
              style={{ borderColor: 'var(--border-color)' }}
            >
              <h2 className="text-xl font-black" style={{ color: 'var(--text-primary)' }}>ABOUT THIS SITE</h2>
              <button
                onClick={() => setShowAbout(false)}
                className="w-10 h-10 bg-[#ff6b6b] border-2 font-bold text-xl text-[var(--color-dark)] hover:bg-red-400 transition-colors flex items-center justify-center"
                style={{ borderColor: 'var(--border-color)' }}
              >
                <X size={20} strokeWidth={3} />
              </button>
            </div>
            <div className="p-4 space-y-4" style={{ color: 'var(--text-primary)' }}>
              <p className="font-medium">
                CustomChess is a chess variant engine supporting arbitrary board
                dimensions (up to 16x16), custom piece movement patterns, and
                configurable tile layouts with disableable squares.
              </p>

              <div>
                <h3 className="font-black text-sm mb-1">CHESS ENGINE (RUST / WASM)</h3>
                <p className="text-sm">
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
                <p className="text-sm">
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
                <p className="text-sm">
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
                <p className="text-sm">
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
