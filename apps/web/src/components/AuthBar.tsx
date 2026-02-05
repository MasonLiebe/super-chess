import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export function AuthBar() {
  const { user, logout } = useAuthStore();
  const location = useLocation();

  // Don't show on login/register pages
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <div className="fixed top-0 right-0 z-40 p-2">
      {user ? (
        <div className="flex items-center gap-2">
          <Link
            to="/account"
            className="text-xs font-bold text-[#2d3436] bg-white/90 px-2 py-1 border border-[#2d3436] hover:bg-[#dfe6e9] transition-colors"
          >
            {user.username}
          </Link>
          <button
            onClick={logout}
            className="text-xs font-bold text-[#636e72] bg-white/90 px-2 py-1 border border-[#2d3436] hover:bg-[#ff6b6b] hover:text-[#2d3436] transition-colors"
          >
            LOGOUT
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-1">
          <Link
            to={`/login?redirect=${encodeURIComponent(location.pathname)}`}
            className="text-xs font-bold text-[#2d3436] bg-white/90 px-2 py-1 border border-[#2d3436] hover:bg-[#4ecdc4] transition-colors"
          >
            LOG IN
          </Link>
          <Link
            to={`/register?redirect=${encodeURIComponent(location.pathname)}`}
            className="text-xs font-bold text-[#2d3436] bg-[#a29bfe]/90 px-2 py-1 border border-[#2d3436] hover:brightness-95 transition-colors"
          >
            REGISTER
          </Link>
        </div>
      )}
    </div>
  );
}
