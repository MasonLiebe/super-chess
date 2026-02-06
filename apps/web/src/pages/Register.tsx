import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { register } from '../lib/api';
import { useAuthStore } from '../stores/authStore';
import { ArrowLeft } from 'lucide-react';

export function Register() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setAuth } = useAuthStore();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const redirect = searchParams.get('redirect') || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (username.length < 3 || username.length > 30) {
      setError('Username must be 3-30 characters');
      return;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setError('Username must be alphanumeric with underscores only');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const res = await register(username, password, email || undefined);
      setAuth(res.token, res.user);
      navigate(redirect);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4">
      <div className="max-w-sm w-full">
        <div className="bg-white border-4 border-[#2d3436] shadow-[8px_8px_0px_#2d3436] p-8">
          <h1 className="text-3xl font-black text-[#2d3436] mb-6 text-center">REGISTER</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-bold text-[#2d3436] mb-1">USERNAME</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="3-30 chars, alphanumeric"
                className="w-full p-3 border-3 border-[#2d3436] font-medium text-[#2d3436] placeholder:text-[#b2bec3]"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-[#2d3436] mb-1">EMAIL (OPTIONAL)</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="For password recovery"
                className="w-full p-3 border-3 border-[#2d3436] font-medium text-[#2d3436] placeholder:text-[#b2bec3]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#2d3436] mb-1">PASSWORD</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="8+ characters"
                className="w-full p-3 border-3 border-[#2d3436] font-medium text-[#2d3436] placeholder:text-[#b2bec3]"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-[#2d3436] mb-1">CONFIRM PASSWORD</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border-3 border-[#2d3436] font-medium text-[#2d3436]"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-[#ff6b6b] border-2 border-[#2d3436] text-[#2d3436] font-medium text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#a29bfe] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-3 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all disabled:opacity-50"
            >
              {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
            </button>
          </form>

          <p className="text-center text-[#636e72] mt-4 text-sm">
            Already have an account?{' '}
            <Link to={`/login${redirect !== '/' ? `?redirect=${encodeURIComponent(redirect)}` : ''}`} className="text-[#2d3436] font-bold underline">
              Log in
            </Link>
          </p>
        </div>

        <div className="text-center mt-4">
          <Link to="/" className="inline-flex items-center gap-1 text-[#636e72] font-medium text-sm hover:text-[#2d3436]">
            <ArrowLeft size={14} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
