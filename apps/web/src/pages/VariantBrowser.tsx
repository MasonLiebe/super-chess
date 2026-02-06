import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BoardThumbnail } from '../components/chess/BoardThumbnail';
import { listVariants, likeVariant, unlikeVariant } from '../lib/api';
import { useAuthStore } from '../stores/authStore';
import { ArrowLeft, Search, Heart, MessageSquare, PackageOpen } from 'lucide-react';
import type { VariantSummary } from '../types/api';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'most_commented', label: 'Most Discussed' },
] as const;

export function VariantBrowser() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [variants, setVariants] = useState<VariantSummary[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<string>('newest');
  const [error, setError] = useState('');

  const fetchVariants = useCallback(async (cursor?: string) => {
    try {
      const isLoadMore = !!cursor;
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const res = await listVariants({
        q: search || undefined,
        sort,
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
  }, [search, sort]);

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

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 flex flex-col justify-center">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            className="flex items-center gap-1.5 bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] px-4 py-2 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all"
          >
            <ArrowLeft size={18} strokeWidth={3} />
            BACK
          </Link>
          <h1 className="text-2xl font-black text-[#2d3436]">BROWSE VARIANTS</h1>
          <div className="w-20" />
        </div>

        {/* Search & Sort */}
        <div className="bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <form onSubmit={handleSearch} className="flex-1 flex gap-2">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search variants..."
                className="flex-1 p-2 border-2 border-[#2d3436] font-medium text-[#2d3436] placeholder:text-[#b2bec3]"
              />
              <button
                type="submit"
                className="flex items-center gap-1.5 bg-[#4ecdc4] border-2 border-[#2d3436] px-4 py-2 font-bold text-[#2d3436] hover:brightness-95 transition-all"
              >
                <Search size={16} strokeWidth={3} />
                SEARCH
              </button>
            </form>

            <div className="flex gap-1">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSort(opt.value)}
                  className={`px-3 py-2 text-sm font-bold border-2 border-[#2d3436] transition-colors ${
                    sort === opt.value
                      ? 'bg-[#a29bfe] text-[#2d3436]'
                      : 'bg-white text-[#636e72] hover:bg-[#f8f9fa]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="p-4 bg-[#ff6b6b] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] mb-6 font-bold text-[#2d3436]">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-4 border-[#2d3436] border-t-transparent rounded-full mx-auto mb-4" />
              <p className="font-bold text-[#636e72]">Loading variants...</p>
            </div>
          </div>
        ) : variants.length === 0 ? (
          <div className="bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-12 text-center">
            <PackageOpen size={40} className="mx-auto mb-3 text-[#b2bec3]" />
            <p className="text-xl font-bold text-[#636e72] mb-2">No variants found</p>
            <p className="text-[#b2bec3] mb-4">Be the first to publish one!</p>
            <Link
              to="/editor"
              className="inline-block bg-[#a29bfe] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] px-6 py-3 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all"
            >
              OPEN EDITOR
            </Link>
          </div>
        ) : (
          <>
            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {variants.map((variant) => (
                <div
                  key={variant.id}
                  className="bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all cursor-pointer"
                  onClick={() => navigate(`/variants/${variant.id}`)}
                >
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <BoardThumbnail gameState={variant.gameState} size={120} />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-black text-[#2d3436] truncate">{variant.name}</h3>
                        <p className="text-sm text-[#636e72]">by {variant.author.username}</p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-[#636e72]">
                          <span className="px-2 py-0.5 bg-[#f8f9fa] border border-[#dfe6e9] font-medium">
                            {variant.boardWidth}x{variant.boardHeight}
                          </span>
                          <span>{variant.pieceCount} pieces</span>
                        </div>
                        {variant.description && (
                          <p className="text-xs text-[#636e72] mt-2 line-clamp-2">{variant.description}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t-2 border-[#f8f9fa]">
                      <div className="flex items-center gap-3 text-sm">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLikeToggle(variant);
                          }}
                          className={`flex items-center gap-1 font-bold transition-colors ${
                            variant.liked ? 'text-[#ff6b6b]' : 'text-[#636e72] hover:text-[#ff6b6b]'
                          }`}
                        >
                          <Heart size={14} fill={variant.liked ? 'currentColor' : 'none'} />
                          <span>{variant.likeCount}</span>
                        </button>
                        <span className="flex items-center gap-1 text-[#636e72]">
                          <MessageSquare size={14} />
                          {variant.commentCount}
                        </span>
                      </div>
                      <span className="text-xs text-[#b2bec3]">
                        {new Date(variant.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            {nextCursor && (
              <div className="text-center mt-6">
                <button
                  onClick={() => fetchVariants(nextCursor)}
                  disabled={loadingMore}
                  className="bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] px-8 py-3 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all disabled:opacity-50"
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
