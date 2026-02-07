import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BoardThumbnail } from '../components/chess/BoardThumbnail';
import { listVariants, likeVariant, unlikeVariant } from '../lib/api';
import { useAuthStore } from '../stores/authStore';
import { ArrowLeft, Search, Heart, MessageSquare, PackageOpen } from 'lucide-react';
import type { VariantSummary } from '../types/api';

type TabValue = 'popular' | 'newest' | 'most_commented' | 'liked';

const TABS: { value: TabValue; label: string; mobileLabel: string }[] = [
  { value: 'popular', label: 'Popular', mobileLabel: 'Popular' },
  { value: 'newest', label: 'Newest', mobileLabel: 'New' },
  { value: 'most_commented', label: 'Discussed', mobileLabel: 'Discussed' },
  { value: 'liked', label: 'Liked', mobileLabel: 'Liked' },
];

export function VariantBrowser() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [variants, setVariants] = useState<VariantSummary[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<TabValue>('popular');
  const [error, setError] = useState('');

  const fetchVariants = useCallback(async (cursor?: string) => {
    try {
      const isLoadMore = !!cursor;
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const isLiked = activeTab === 'liked';
      const res = await listVariants({
        q: search || undefined,
        sort: isLiked ? 'newest' : activeTab,
        liked_by: isLiked && user ? user.id : undefined,
        cursor,
        limit: 20,
      });

      if (isLoadMore) {
        setVariants((prev) => [...prev, ...res.variants]);
      } else {
        setVariants(res.variants);
      }
      setNextCursor(res.nextCursor);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load variants');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [search, activeTab, user]);

  useEffect(() => {
    fetchVariants();
  }, [fetchVariants]);

  const handleLikeToggle = useCallback(async (variant: VariantSummary) => {
    if (!user) {
      navigate('/login?redirect=/browse');
      return;
    }

    try {
      const res = variant.liked
        ? await unlikeVariant(variant.id)
        : await likeVariant(variant.id);

      setVariants((prev) =>
        prev.map((v) =>
          v.id === variant.id
            ? { ...v, likeCount: res.likeCount, liked: res.liked }
            : v
        )
      );
    } catch {
      // ignore
    }
  }, [user, navigate]);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    fetchVariants();
  }, [fetchVariants]);

  const handleTabChange = useCallback((tab: TabValue) => {
    if (tab === 'liked' && !user) {
      navigate('/login?redirect=/browse');
      return;
    }
    setActiveTab(tab);
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-[var(--bg-page)] px-2 lg:px-4 pb-4 pt-12">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3 lg:mb-6">
          <Link
            to="/"
            className="flex items-center justify-center bg-[var(--bg-card)] border-2 lg:border-4 border-[var(--border-color)] shadow-[2px_2px_0px_var(--shadow-color)] lg:shadow-[4px_4px_0px_var(--shadow-color)] w-10 h-10 font-bold text-[var(--text-primary)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[1px_1px_0px_var(--shadow-color)] lg:hover:shadow-[2px_2px_0px_var(--shadow-color)] transition-all"
            title="Back to home"
          >
            <ArrowLeft size={18} strokeWidth={3} />
          </Link>
          <h1 className="text-lg sm:text-2xl font-black text-[var(--text-primary)] flex-1 text-center">BROWSE VARIANTS</h1>
          <div className="w-10" />
        </div>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-3 lg:mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search variants..."
            className="flex-1 p-2 border-2 lg:border-4 border-[var(--border-color)] bg-[var(--bg-card)] text-sm lg:text-base text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
          />
          <button
            type="submit"
            className="flex items-center justify-center bg-[#4ecdc4] border-2 lg:border-4 border-[var(--border-color)] shadow-[2px_2px_0px_var(--shadow-color)] lg:shadow-[4px_4px_0px_var(--shadow-color)] w-10 h-10 lg:w-auto lg:h-auto lg:px-4 lg:py-2 font-bold text-[var(--color-dark)] hover:brightness-95 transition-all"
          >
            <Search size={16} strokeWidth={3} className="lg:hidden" />
            <span className="hidden lg:flex items-center gap-1.5"><Search size={16} strokeWidth={3} /> SEARCH</span>
          </button>
        </form>

        {/* Tab bar */}
        <div className="flex border-2 lg:border-4 border-[var(--border-color)] shadow-[2px_2px_0px_var(--shadow-color)] lg:shadow-[4px_4px_0px_var(--shadow-color)] mb-3 lg:mb-6">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => handleTabChange(tab.value)}
              className={`flex-1 py-2 lg:py-2.5 text-xs lg:text-sm font-bold border-r-2 last:border-r-0 border-[var(--border-color)] transition-colors flex items-center justify-center gap-1 ${
                activeTab === tab.value
                  ? 'bg-[#a29bfe] text-[var(--color-dark)]'
                  : 'bg-[var(--bg-card)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'
              }`}
            >
              {tab.value === 'liked' && <Heart size={12} fill={activeTab === 'liked' ? 'currentColor' : 'none'} />}
              <span className="lg:hidden">{tab.mobileLabel}</span>
              <span className="hidden lg:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="p-3 lg:p-4 bg-[#ff6b6b] border-2 lg:border-4 border-[var(--border-color)] shadow-[2px_2px_0px_var(--shadow-color)] lg:shadow-[4px_4px_0px_var(--shadow-color)] mb-3 lg:mb-6 font-bold text-sm lg:text-base text-[var(--color-dark)]">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-4 border-[var(--border-color)] border-t-transparent rounded-full mx-auto mb-4" />
              <p className="font-bold text-[var(--text-secondary)]">Loading variants...</p>
            </div>
          </div>
        ) : variants.length === 0 ? (
          <div className="bg-[var(--bg-card)] border-2 lg:border-4 border-[var(--border-color)] shadow-[2px_2px_0px_var(--shadow-color)] lg:shadow-[4px_4px_0px_var(--shadow-color)] p-8 lg:p-12 text-center">
            <PackageOpen size={40} className="mx-auto mb-3 text-[var(--text-muted)]" />
            <p className="text-lg lg:text-xl font-bold text-[var(--text-secondary)] mb-2">
              {activeTab === 'liked' ? 'No liked variants yet' : 'No variants found'}
            </p>
            <p className="text-sm lg:text-base text-[var(--text-muted)] mb-4">
              {activeTab === 'liked' ? 'Like some variants and they\'ll appear here!' : 'Be the first to publish one!'}
            </p>
            {activeTab !== 'liked' && (
              <Link
                to="/editor"
                className="inline-block bg-[#a29bfe] border-2 lg:border-4 border-[var(--border-color)] shadow-[2px_2px_0px_var(--shadow-color)] lg:shadow-[4px_4px_0px_var(--shadow-color)] px-6 py-3 font-bold text-[var(--color-dark)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[1px_1px_0px_var(--shadow-color)] lg:hover:shadow-[2px_2px_0px_var(--shadow-color)] transition-all"
              >
                OPEN EDITOR
              </Link>
            )}
          </div>
        ) : (
          <>
            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
              {variants.map((variant) => (
                <div
                  key={variant.id}
                  className="bg-[var(--bg-card)] border-2 lg:border-4 border-[var(--border-color)] shadow-[2px_2px_0px_var(--shadow-color)] lg:shadow-[4px_4px_0px_var(--shadow-color)] hover:translate-x-0.5 hover:translate-y-0.5 lg:hover:translate-x-1 lg:hover:translate-y-1 hover:shadow-[1px_1px_0px_var(--shadow-color)] lg:hover:shadow-[2px_2px_0px_var(--shadow-color)] transition-all cursor-pointer"
                  onClick={() => navigate(`/variants/${variant.id}`)}
                >
                  <div className="p-3 lg:p-4">
                    <div className="flex items-start gap-3">
                      <BoardThumbnail gameState={variant.gameState} size={100} />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-black text-sm lg:text-base text-[var(--text-primary)] truncate">{variant.name}</h3>
                        <p className="text-xs lg:text-sm text-[var(--text-secondary)]">by {variant.author.username}</p>
                        <div className="flex items-center gap-2 mt-1.5 lg:mt-2 text-[10px] lg:text-xs text-[var(--text-secondary)]">
                          <span className="px-1.5 py-0.5 bg-[var(--bg-card-hover)] border border-[var(--divider)] font-medium">
                            {variant.boardWidth}x{variant.boardHeight}
                          </span>
                          <span>{variant.pieceCount} pieces</span>
                        </div>
                        {variant.description && (
                          <p className="text-[10px] lg:text-xs text-[var(--text-secondary)] mt-1.5 lg:mt-2 line-clamp-2">{variant.description}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2.5 lg:mt-3 pt-2.5 lg:pt-3 border-t-2 border-[var(--divider)]">
                      <div className="flex items-center gap-3 text-xs lg:text-sm">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLikeToggle(variant);
                          }}
                          className={`flex items-center gap-1 font-bold transition-colors ${
                            variant.liked ? 'text-[#ff6b6b]' : 'text-[var(--text-secondary)] hover:text-[#ff6b6b]'
                          }`}
                        >
                          <Heart size={14} fill={variant.liked ? 'currentColor' : 'none'} />
                          <span>{variant.likeCount}</span>
                        </button>
                        <span className="flex items-center gap-1 text-[var(--text-secondary)]">
                          <MessageSquare size={14} />
                          {variant.commentCount}
                        </span>
                      </div>
                      <span className="text-[10px] lg:text-xs text-[var(--text-muted)]">
                        {new Date(variant.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            {nextCursor && (
              <div className="text-center mt-4 lg:mt-6">
                <button
                  onClick={() => fetchVariants(nextCursor)}
                  disabled={loadingMore}
                  className="bg-[var(--bg-card)] border-2 lg:border-4 border-[var(--border-color)] shadow-[2px_2px_0px_var(--shadow-color)] lg:shadow-[4px_4px_0px_var(--shadow-color)] px-6 lg:px-8 py-2.5 lg:py-3 font-bold text-sm lg:text-base text-[var(--text-primary)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[1px_1px_0px_var(--shadow-color)] lg:hover:shadow-[2px_2px_0px_var(--shadow-color)] transition-all disabled:opacity-50"
                >
                  {loadingMore ? 'LOADING...' : 'LOAD MORE'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
