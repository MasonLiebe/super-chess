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
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white border-4 border-[#2d3436] shadow-[8px_8px_0px_#2d3436] p-8">
          <h1 className="text-3xl font-black text-[#2d3436] mb-6 text-center">ACCOUNT</h1>

          {fetching ? (
            <p className="text-center text-[#636e72]">Loading...</p>
          ) : (
            <div className="space-y-6">
              {/* Username (read-only) */}
              <div>
                <label className="block font-bold text-[#2d3436] mb-1">USERNAME</label>
                <div className="w-full p-3 border-3 border-[#dfe6e9] bg-[#f8f9fa] font-medium text-[#636e72]">
                  {user.username}
                </div>
              </div>

              {/* Email section */}
              <div>
                <label className="block font-bold text-[#2d3436] mb-1">EMAIL</label>

                {currentEmail ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-[#2d3436]">{currentEmail}</span>
                      {emailVerified ? (
                        <span className="text-xs font-bold bg-[#00b894] text-white px-2 py-0.5 border border-[#2d3436]">
                          VERIFIED
                        </span>
                      ) : (
                        <span className="text-xs font-bold bg-[#fdcb6e] text-[#2d3436] px-2 py-0.5 border border-[#2d3436]">
                          UNVERIFIED
                        </span>
                      )}
                    </div>

                    {!emailVerified && (
                      <button
                        onClick={handleResend}
                        disabled={loading}
                        className="text-sm font-bold text-[#2d3436] bg-[#4ecdc4] border-2 border-[#2d3436] shadow-[2px_2px_0px_#2d3436] px-3 py-1 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#2d3436] transition-all disabled:opacity-50"
                      >
                        RESEND VERIFICATION
                      </button>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-[#636e72] mb-2">No email set. Add one for password recovery.</p>
                )}
              </div>

              {/* Add/Change email form */}
              <form onSubmit={handleSetEmail} className="space-y-3">
                <div>
                  <label className="block font-bold text-[#2d3436] mb-1 text-sm">
                    {currentEmail ? 'CHANGE EMAIL' : 'ADD EMAIL'}
                  </label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full p-3 border-3 border-[#2d3436] font-medium text-[#2d3436] placeholder:text-[#b2bec3]"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#a29bfe] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-3 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all disabled:opacity-50"
                >
                  {loading ? 'SAVING...' : currentEmail ? 'UPDATE EMAIL' : 'ADD EMAIL'}
                </button>
              </form>

              {message && (
                <div className="p-3 bg-[#00b894] border-2 border-[#2d3436] text-[#2d3436] font-medium text-sm">
                  {message}
                </div>
              )}
              {error && (
                <div className="p-3 bg-[#ff6b6b] border-2 border-[#2d3436] text-[#2d3436] font-medium text-sm">
                  {error}
                </div>
              )}
            </div>
          )}
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
