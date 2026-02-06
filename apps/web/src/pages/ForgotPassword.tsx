import { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../lib/api';
import { ArrowLeft } from 'lucide-react';

export function ForgotPassword() {
  const [identifier, setIdentifier] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const res = await forgotPassword(identifier);
      setMessage(res.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)] flex items-center justify-center p-4">
      <div className="max-w-sm w-full">
        <div className="bg-[var(--bg-card)] border-4 border-[var(--border-color)] shadow-[8px_8px_0px_var(--shadow-color)] p-8">
          <h1 className="text-3xl font-black text-[var(--text-primary)] mb-2 text-center">FORGOT PASSWORD</h1>
          <p className="text-center text-[var(--text-secondary)] text-sm mb-6">
            Enter your username or email to receive a reset link.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-bold text-[var(--text-primary)] mb-1">USERNAME OR EMAIL</label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full p-3 border-3 border-[var(--border-color)] font-medium"
                required
              />
            </div>

            {message && (
              <div className="p-3 bg-[#00b894] border-2 border-[var(--border-color)] text-[var(--color-dark)] font-medium text-sm">
                {message}
              </div>
            )}
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
              {loading ? 'SENDING...' : 'SEND RESET LINK'}
            </button>
          </form>

          <p className="text-center text-[var(--text-secondary)] mt-4 text-sm">
            <Link to="/login" className="text-[var(--text-primary)] font-bold underline">
              Back to Login
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
