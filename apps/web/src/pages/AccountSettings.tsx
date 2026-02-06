import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getMe, setEmail, resendVerification } from '../lib/api';
import { useAuthStore } from '../stores/authStore';
import { ArrowLeft } from 'lucide-react';

export function AccountSettings() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [currentEmail, setCurrentEmail] = useState<string | null>(null);
  const [emailVerified, setEmailVerified] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=/account');
      return;
    }
    getMe()
      .then((data) => {
        setCurrentEmail(data.email ?? null);
        setEmailVerified(data.email_verified ?? false);
      })
      .catch(() => setError('Failed to load account info'))
      .finally(() => setFetching(false));
  }, [user, navigate]);

  const handleSetEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const res = await setEmail(newEmail);
      setMessage(res.message);
      setCurrentEmail(newEmail);
      setEmailVerified(false);
      setNewEmail('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to set email');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const res = await resendVerification();
      setMessage(res.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resend');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[var(--bg-page)] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-[var(--bg-card)] border-4 border-[var(--border-color)] shadow-[8px_8px_0px_var(--shadow-color)] p-8">
          <h1 className="text-3xl font-black text-[var(--text-primary)] mb-6 text-center">ACCOUNT</h1>

          {fetching ? (
            <p className="text-center text-[var(--text-secondary)]">Loading...</p>
          ) : (
            <div className="space-y-6">
              {/* Username (read-only) */}
              <div>
                <label className="block font-bold text-[var(--text-primary)] mb-1">USERNAME</label>
                <div className="w-full p-3 border-3 border-[var(--divider)] bg-[var(--bg-card-hover)] font-medium text-[var(--text-secondary)]">
                  {user.username}
                </div>
              </div>

              {/* Email section */}
              <div>
                <label className="block font-bold text-[var(--text-primary)] mb-1">EMAIL</label>

                {currentEmail ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-[var(--text-primary)]">{currentEmail}</span>
                      {emailVerified ? (
                        <span className="text-xs font-bold bg-[#00b894] text-white px-2 py-0.5 border border-[var(--border-color)]">
                          VERIFIED
                        </span>
                      ) : (
                        <span className="text-xs font-bold bg-[#fdcb6e] text-[var(--color-dark)] px-2 py-0.5 border border-[var(--border-color)]">
                          UNVERIFIED
                        </span>
                      )}
                    </div>

                    {!emailVerified && (
                      <button
                        onClick={handleResend}
                        disabled={loading}
                        className="text-sm font-bold text-[var(--color-dark)] bg-[#4ecdc4] border-2 border-[var(--border-color)] shadow-[2px_2px_0px_var(--shadow-color)] px-3 py-1 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_var(--shadow-color)] transition-all disabled:opacity-50"
                      >
                        RESEND VERIFICATION
                      </button>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-[var(--text-secondary)] mb-2">No email set. Add one for password recovery.</p>
                )}
              </div>

              {/* Add/Change email form */}
              <form onSubmit={handleSetEmail} className="space-y-3">
                <div>
                  <label className="block font-bold text-[var(--text-primary)] mb-1 text-sm">
                    {currentEmail ? 'CHANGE EMAIL' : 'ADD EMAIL'}
                  </label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full p-3 border-3 border-[var(--border-color)] font-medium placeholder:text-[var(--text-muted)]"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#a29bfe] border-4 border-[var(--border-color)] shadow-[4px_4px_0px_var(--shadow-color)] p-3 font-bold text-[var(--color-dark)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_var(--shadow-color)] transition-all disabled:opacity-50"
                >
                  {loading ? 'SAVING...' : currentEmail ? 'UPDATE EMAIL' : 'ADD EMAIL'}
                </button>
              </form>

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
            </div>
          )}
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
