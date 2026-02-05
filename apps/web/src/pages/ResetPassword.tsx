import { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../lib/api';

export function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

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
      await resetPassword(token, password);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4">
        <div className="max-w-sm w-full">
          <div className="bg-white border-4 border-[#2d3436] shadow-[8px_8px_0px_#2d3436] p-8 text-center">
            <h1 className="text-3xl font-black text-[#2d3436] mb-4">INVALID LINK</h1>
            <p className="text-[#636e72] mb-4">This reset link is missing a token.</p>
            <Link to="/forgot-password" className="text-[#2d3436] font-bold underline">
              Request a new reset link
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4">
        <div className="max-w-sm w-full">
          <div className="bg-white border-4 border-[#2d3436] shadow-[8px_8px_0px_#2d3436] p-8 text-center">
            <h1 className="text-3xl font-black text-[#2d3436] mb-4">PASSWORD RESET</h1>
            <div className="p-3 bg-[#00b894] border-2 border-[#2d3436] text-[#2d3436] font-medium text-sm mb-4">
              Password reset successful! Redirecting to login...
            </div>
            <Link to="/login" className="text-[#2d3436] font-bold underline">
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4">
      <div className="max-w-sm w-full">
        <div className="bg-white border-4 border-[#2d3436] shadow-[8px_8px_0px_#2d3436] p-8">
          <h1 className="text-3xl font-black text-[#2d3436] mb-6 text-center">RESET PASSWORD</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-bold text-[#2d3436] mb-1">NEW PASSWORD</label>
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
              className="w-full bg-[#4ecdc4] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-3 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all disabled:opacity-50"
            >
              {loading ? 'RESETTING...' : 'RESET PASSWORD'}
            </button>
          </form>

          <p className="text-center text-[#636e72] mt-4 text-sm">
            <Link to="/forgot-password" className="text-[#2d3436] font-bold underline">
              Request a new link
            </Link>
          </p>
        </div>

        <div className="text-center mt-4">
          <Link to="/" className="text-[#636e72] font-medium text-sm hover:text-[#2d3436]">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
