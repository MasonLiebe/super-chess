import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { verifyEmail } from '../lib/api';

export function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Missing verification token.');
      return;
    }

    verifyEmail(token)
      .then((res) => {
        setStatus('success');
        setMessage(res.message);
      })
      .catch((err) => {
        setStatus('error');
        setMessage(err instanceof Error ? err.message : 'Verification failed');
      });
  }, [token]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4">
      <div className="max-w-sm w-full">
        <div className="bg-white border-4 border-[#2d3436] shadow-[8px_8px_0px_#2d3436] p-8 text-center">
          <h1 className="text-3xl font-black text-[#2d3436] mb-4">EMAIL VERIFICATION</h1>

          {status === 'loading' && (
            <p className="text-[#636e72] font-medium">Verifying your email...</p>
          )}

          {status === 'success' && (
            <div className="space-y-4">
              <div className="p-3 bg-[#00b894] border-2 border-[#2d3436] text-[#2d3436] font-medium text-sm">
                {message}
              </div>
              <div className="flex gap-2 justify-center">
                <Link
                  to="/account"
                  className="text-sm font-bold text-[#2d3436] bg-[#a29bfe] border-2 border-[#2d3436] shadow-[2px_2px_0px_#2d3436] px-4 py-2 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#2d3436] transition-all"
                >
                  ACCOUNT
                </Link>
                <Link
                  to="/"
                  className="text-sm font-bold text-[#2d3436] bg-[#4ecdc4] border-2 border-[#2d3436] shadow-[2px_2px_0px_#2d3436] px-4 py-2 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#2d3436] transition-all"
                >
                  HOME
                </Link>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-4">
              <div className="p-3 bg-[#ff6b6b] border-2 border-[#2d3436] text-[#2d3436] font-medium text-sm">
                {message}
              </div>
              <Link
                to="/account"
                className="inline-block text-sm font-bold text-[#2d3436] bg-[#a29bfe] border-2 border-[#2d3436] shadow-[2px_2px_0px_#2d3436] px-4 py-2 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#2d3436] transition-all"
              >
                ACCOUNT SETTINGS
              </Link>
            </div>
          )}
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
