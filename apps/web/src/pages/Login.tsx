import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { login } from '../lib/api';
import { useAuthStore } from '../stores/authStore';
import { ArrowLeft } from 'lucide-react';

export function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setAuth } = useAuthStore();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const redirect = searchParams.get('redirect') || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login(username, password);
      setAuth(res.token, res.user);
      navigate(redirect);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)] flex items-center justify-center p-4">
      <div className="max-w-sm w-full">
        <div className="bg-[var(--bg-card)] border-4 border-[var(--border-color)] shadow-[8px_8px_0px_var(--shadow-color)] p-8">
          <h1 className="text-3xl font-black text-[var(--text-primary)] mb-6 text-center">LOG IN</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-bold text-[var(--text-primary)] mb-1">USERNAME</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border-3 border-[var(--border-color)] font-medium"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-[var(--text-primary)] mb-1">PASSWORD</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border-3 border-[var(--border-color)] font-medium"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-[#ff6b6b] border-2 border-[var(--border-color)] text-[var(--color-dark)] font-medium text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#4ecdc4] border-4 border-[var(--border-color)] shadow-[4px_4px_0px_var(--shadow-color)] p-3 font-bold text-[var(--color-dark)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_var(--shadow-color)] transition-all disabled:opacity-50"
            >
              {loading ? 'LOGGING IN...' : 'LOG IN'}
            </button>
          </form>

          <p className="text-center text-[var(--text-secondary)] mt-4 text-sm">
            <Link to="/forgot-password" className="text-[var(--text-secondary)] underline hover:text-[var(--text-primary)]">
              Forgot password?
            </Link>
          </p>

          <p className="text-center text-[var(--text-secondary)] mt-2 text-sm">
            Don't have an account?{' '}
            <Link to={`/register${redirect !== '/' ? `?redirect=${encodeURIComponent(redirect)}` : ''}`} className="text-[var(--text-primary)] font-bold underline">
              Register
            </Link>
          </p>
        </div>

        <div className="text-center mt-4">
          <Link to="/" className="inline-flex items-center gap-1 text-[var(--text-secondary)] font-medium text-sm hover:text-[var(--text-primary)]">
            <ArrowLeft size={14} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
