import { useState, useEffect, useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Board } from '../components/chess/Board';
import {
  getVariant,
  likeVariant,
  unlikeVariant,
  deleteVariant,
  listComments,
  createComment,
  deleteComment,
  updateVariant,
} from '../lib/api';
import { useAuthStore } from '../stores/authStore';
import { useEditorStore } from '../stores/editorStore';
import { ArrowLeft, Heart, Swords, Globe, PencilRuler, Pencil, Trash2, MessageSquare } from 'lucide-react';
import type { VariantSummary, Comment } from '../types/api';

export function VariantDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const editorStore = useEditorStore();

  const [variant, setVariant] = useState<VariantSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Comments
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsCursor, setCommentsCursor] = useState<string | null>(null);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  // Edit mode
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getVariant(Number(id))
      .then((v) => {
        setVariant(v);
        setEditName(v.name);
        setEditDescription(v.description);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  // Load comments
  useEffect(() => {
    if (!id) return;
    setCommentsLoading(true);
    listComments(Number(id))
      .then((res) => {
        setComments(res.comments);
        setCommentsCursor(res.nextCursor);
      })
      .finally(() => setCommentsLoading(false));
  }, [id]);

  const handleLoadMoreComments = useCallback(async () => {
    if (!commentsCursor || !id) return;
    setCommentsLoading(true);
    try {
      const res = await listComments(Number(id), { cursor: commentsCursor });
      setComments((prev) => [...prev, ...res.comments]);
      setCommentsCursor(res.nextCursor);
    } finally {
      setCommentsLoading(false);
    }
  }, [commentsCursor, id]);

  const handleLikeToggle = useCallback(async () => {
    if (!variant) return;
    if (!user) {
      navigate(`/login?redirect=/variants/${variant.id}`);
      return;
    }
    try {
      const res = variant.liked
        ? await unlikeVariant(variant.id)
        : await likeVariant(variant.id);
      setVariant((v) => v ? { ...v, likeCount: res.likeCount, liked: res.liked } : v);
    } catch {
      // ignore
    }
  }, [variant, user, navigate]);

  const handleAddComment = useCallback(async () => {
    if (!variant || !newComment.trim()) return;
    if (!user) {
      navigate(`/login?redirect=/variants/${variant.id}`);
      return;
    }
    setSubmittingComment(true);
    try {
      const comment = await createComment(variant.id, newComment.trim());
      setComments((prev) => [comment, ...prev]);
      setVariant((v) => v ? { ...v, commentCount: v.commentCount + 1 } : v);
      setNewComment('');
    } catch {
      // ignore
    } finally {
      setSubmittingComment(false);
    }
  }, [variant, newComment, user, navigate]);

  const handleDeleteComment = useCallback(async (commentId: number) => {
    if (!confirm('Delete this comment?')) return;
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
      setVariant((v) => v ? { ...v, commentCount: Math.max(0, v.commentCount - 1) } : v);
    } catch {
      // ignore
    }
  }, []);

  const handleDelete = useCallback(async () => {
    if (!variant) return;
    if (!confirm(`Delete variant "${variant.name}"? This cannot be undone.`)) return;
    try {
      await deleteVariant(variant.id);
      navigate('/browse');
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Failed to delete');
    }
  }, [variant, navigate]);

  const handleSaveEdit = useCallback(async () => {
    if (!variant) return;
    try {
      await updateVariant(variant.id, {
        name: editName.trim(),
        description: editDescription.trim(),
      });
      setVariant((v) => v ? { ...v, name: editName.trim(), description: editDescription.trim() } : v);
      setEditing(false);
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Failed to update');
    }
  }, [variant, editName, editDescription]);

  const handleEditInEditor = useCallback(() => {
    if (!variant) return;
    editorStore.loadGameState(variant.gameState);
    navigate('/editor');
  }, [variant, editorStore, navigate]);

  const isOwner = user && variant && user.id === variant.author.id;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-[#2d3436] border-t-transparent rounded-full mx-auto mb-4" />
          <p className="font-bold text-[#636e72]">Loading variant...</p>
        </div>
      </div>
    );
  }

  if (error || !variant) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4">
        <div className="bg-white border-4 border-[#2d3436] shadow-[8px_8px_0px_#2d3436] p-8 text-center max-w-sm">
          <p className="text-xl font-bold text-[#2d3436] mb-2">Variant not found</p>
          <p className="text-[#636e72] mb-4">{error || 'This variant may have been deleted.'}</p>
          <Link
            to="/browse"
            className="inline-block bg-[#4ecdc4] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] px-6 py-3 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all"
          >
            BROWSE VARIANTS
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 flex flex-col justify-center">
      <div className="max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/browse"
            className="flex items-center gap-1.5 bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] px-4 py-2 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all"
          >
            <ArrowLeft size={18} strokeWidth={3} />
            BACK
          </Link>
          <h1 className="text-2xl font-black text-[#2d3436] truncate mx-4">{variant.name}</h1>
          <div className="w-20" />
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Board */}
          <div className="flex-shrink-0 w-full max-w-[560px] mx-auto lg:mx-0">
            <Board
              gameState={variant.gameState}
              playerNum={0}
              flipped={false}
              disabled={true}
            />
          </div>

          {/* Info panel */}
          <div className="w-full lg:w-80 space-y-4">
            {/* Name & Description */}
            <div className="bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4">
              {editing ? (
                <div className="space-y-3">
                  <div>
                    <label className="block font-bold text-[#2d3436] mb-1">NAME</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full p-2 border-2 border-[#2d3436] font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#2d3436] mb-1">DESCRIPTION</label>
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      rows={4}
                      className="w-full p-2 border-2 border-[#2d3436] font-medium resize-none"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveEdit}
                      className="flex-1 bg-[#4ecdc4] border-2 border-[#2d3436] p-2 font-bold text-sm"
                    >
                      SAVE
                    </button>
                    <button
                      onClick={() => {
                        setEditing(false);
                        setEditName(variant.name);
                        setEditDescription(variant.description);
                      }}
                      className="flex-1 bg-white border-2 border-[#2d3436] p-2 font-bold text-sm text-[#636e72]"
                    >
                      CANCEL
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-black text-[#2d3436] mb-1">{variant.name}</h2>
                  <p className="text-sm text-[#636e72] mb-2">
                    by <span className="font-bold">{variant.author.username}</span>
                  </p>
                  <div className="flex items-center gap-2 mb-3 text-xs text-[#636e72]">
                    <span className="px-2 py-0.5 bg-[#f8f9fa] border border-[#dfe6e9] font-medium">
                      {variant.boardWidth}x{variant.boardHeight}
                    </span>
                    <span>{variant.pieceCount} pieces</span>
                    <span>{new Date(variant.createdAt).toLocaleDateString()}</span>
                  </div>
                  {variant.description && (
                    <p className="text-sm text-[#2d3436] whitespace-pre-wrap">{variant.description}</p>
                  )}
                </>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <button
                  onClick={handleLikeToggle}
                  className={`flex-1 border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-3 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all ${
                    variant.liked ? 'bg-[#ff6b6b]' : 'bg-white'
                  }`}
                >
                  <Heart size={16} fill={variant.liked ? 'currentColor' : 'none'} /> {variant.likeCount}
                </button>
              </div>

              <Link
                to={`/singleplayer?from=variant&id=${variant.id}`}
                className="flex items-center justify-center gap-2 w-full bg-[#ff6b6b] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-3 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all"
              >
                <Swords size={18} />
                PLAY VS AI
              </Link>

              <Link
                to={`/create-room?from=variant&id=${variant.id}`}
                className="flex items-center justify-center gap-2 w-full bg-[#4ecdc4] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-3 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all"
              >
                <Globe size={18} />
                CREATE ROOM
              </Link>

              <button
                onClick={handleEditInEditor}
                className="flex items-center justify-center gap-2 w-full bg-[#ffe66d] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-3 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all"
              >
                <PencilRuler size={16} />
                EDIT IN EDITOR
              </button>

              {isOwner && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditing(true)}
                    className="flex items-center justify-center gap-1.5 flex-1 bg-[#a29bfe] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-3 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all"
                  >
                    <Pencil size={16} />
                    EDIT
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex items-center justify-center gap-1.5 flex-1 bg-[#ff6b6b] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-3 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all"
                  >
                    <Trash2 size={16} />
                    DELETE
                  </button>
                </div>
              )}
            </div>

            {/* Comments Section */}
            <div className="bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4">
              <h3 className="flex items-center gap-1.5 font-bold text-[#2d3436] mb-3">
                <MessageSquare size={16} strokeWidth={3} />
                COMMENTS ({variant.commentCount})
              </h3>

              {/* Add comment */}
              {user ? (
                <div className="mb-4">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    rows={2}
                    maxLength={1000}
                    className="w-full p-2 border-2 border-[#2d3436] font-medium text-sm text-[#2d3436] placeholder:text-[#b2bec3] resize-none mb-2"
                  />
                  <button
                    onClick={handleAddComment}
                    disabled={!newComment.trim() || submittingComment}
                    className="bg-[#4ecdc4] border-2 border-[#2d3436] px-4 py-1.5 font-bold text-sm text-[#2d3436] disabled:opacity-50 hover:brightness-95 transition-all"
                  >
                    {submittingComment ? 'POSTING...' : 'POST'}
                  </button>
                </div>
              ) : (
                <p className="text-sm text-[#636e72] mb-4">
                  <Link to={`/login?redirect=/variants/${variant.id}`} className="text-[#2d3436] font-bold underline">
                    Log in
                  </Link>{' '}
                  to comment
                </p>
              )}

              {/* Comments list */}
              <div className="space-y-3">
                {commentsLoading && comments.length === 0 ? (
                  <p className="text-sm text-[#636e72] text-center py-4">Loading comments...</p>
                ) : comments.length === 0 ? (
                  <p className="text-sm text-[#636e72] text-center py-4">No comments yet</p>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} className="border-t border-[#f8f9fa] pt-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-[#2d3436]">{comment.author.username}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-[#b2bec3]">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </span>
                          {user && user.id === comment.author.id && (
                            <button
                              onClick={() => handleDeleteComment(comment.id)}
                              className="text-xs text-[#ff6b6b] font-bold hover:underline"
                            >
                              DELETE
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-[#2d3436] whitespace-pre-wrap">{comment.content}</p>
                    </div>
                  ))
                )}
              </div>

              {commentsCursor && (
                <button
                  onClick={handleLoadMoreComments}
                  disabled={commentsLoading}
                  className="w-full mt-3 p-2 border-2 border-[#2d3436] font-bold text-sm text-[#636e72] hover:bg-[#f8f9fa] disabled:opacity-50"
                >
                  {commentsLoading ? 'LOADING...' : 'LOAD MORE COMMENTS'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
