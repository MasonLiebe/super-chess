import { useAuthStore } from '../stores/authStore';
import { fromRustGameState } from './convert';
import type {
  AuthResponse,
  MeResponse,
  VariantSummary,
  VariantListResponse,
  Comment,
  CommentListResponse,
  LikeResponse,
} from '../types/api';
import type { GameState } from '../types/chess';

const API_BASE = '/api';

async function apiFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const token = useAuthStore.getState().token;
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (options.body && typeof options.body === 'string') {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `API error: ${res.status}`);
  }

  return res;
}

// Convert snake_case API response to camelCase for variants
function convertVariant(raw: Record<string, unknown>): VariantSummary {
  const gameStateRaw = raw.game_state as Record<string, unknown>;
  return {
    id: raw.id as number,
    name: raw.name as string,
    description: raw.description as string,
    author: raw.author as { id: number; username: string },
    boardWidth: raw.board_width as number,
    boardHeight: raw.board_height as number,
    pieceCount: raw.piece_count as number,
    likeCount: raw.like_count as number,
    commentCount: raw.comment_count as number,
    liked: raw.liked as boolean,
    gameState: fromRustGameState(gameStateRaw as Parameters<typeof fromRustGameState>[0]),
    createdAt: raw.created_at as string,
    updatedAt: raw.updated_at as string,
  };
}

function convertComment(raw: Record<string, unknown>): Comment {
  return {
    id: raw.id as number,
    author: raw.author as { id: number; username: string },
    content: raw.content as string,
    createdAt: raw.created_at as string,
  };
}

// Auth API
export async function register(username: string, password: string, email?: string): Promise<AuthResponse> {
  const body: Record<string, string> = { username, password };
  if (email) body.email = email;
  const res = await apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function login(username: string, password: string): Promise<AuthResponse> {
  const res = await apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}

export async function getMe(): Promise<MeResponse> {
  const res = await apiFetch('/auth/me');
  return res.json();
}

// Variants API
export async function listVariants(params: {
  q?: string;
  sort?: string;
  author_id?: number;
  liked_by?: number;
  min_width?: number;
  max_width?: number;
  min_height?: number;
  max_height?: number;
  cursor?: string;
  limit?: number;
} = {}): Promise<VariantListResponse> {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, String(value));
    }
  }
  const query = searchParams.toString();
  const res = await apiFetch(`/variants${query ? `?${query}` : ''}`);
  const data = await res.json();
  return {
    variants: (data.variants as Record<string, unknown>[]).map(convertVariant),
    nextCursor: data.next_cursor as string | null,
  };
}

export async function getVariant(id: number): Promise<VariantSummary> {
  const res = await apiFetch(`/variants/${id}`);
  const data = await res.json();
  return convertVariant(data);
}

export async function createVariant(
  name: string,
  description: string,
  gameState: GameState,
): Promise<VariantSummary> {
  // Convert to snake_case for the API
  const rustState = {
    width: gameState.width,
    height: gameState.height,
    to_move: gameState.toMove,
    tiles: gameState.tiles.map((t) => ({ x: t.x, y: t.y, tile_type: t.tileType })),
    pieces: gameState.pieces.map((p) => ({ owner: p.owner, x: p.x, y: p.y, piece_type: p.pieceType })),
    movement_patterns: gameState.movementPatterns,
  };

  const res = await apiFetch('/variants', {
    method: 'POST',
    body: JSON.stringify({ name, description, game_state: rustState }),
  });
  const data = await res.json();
  return convertVariant(data);
}

export async function updateVariant(
  id: number,
  updates: { name?: string; description?: string },
): Promise<void> {
  await apiFetch(`/variants/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
}

export async function deleteVariant(id: number): Promise<void> {
  await apiFetch(`/variants/${id}`, {
    method: 'DELETE',
  });
}

// Likes API
export async function likeVariant(id: number): Promise<LikeResponse> {
  const res = await apiFetch(`/variants/${id}/like`, { method: 'POST' });
  const data = await res.json();
  return { likeCount: data.like_count, liked: data.liked };
}

export async function unlikeVariant(id: number): Promise<LikeResponse> {
  const res = await apiFetch(`/variants/${id}/like`, { method: 'DELETE' });
  const data = await res.json();
  return { likeCount: data.like_count, liked: data.liked };
}

// Comments API
export async function listComments(
  variantId: number,
  params: { cursor?: string; limit?: number } = {},
): Promise<CommentListResponse> {
  const searchParams = new URLSearchParams();
  if (params.cursor) searchParams.set('cursor', params.cursor);
  if (params.limit) searchParams.set('limit', String(params.limit));
  const query = searchParams.toString();
  const res = await apiFetch(`/variants/${variantId}/comments${query ? `?${query}` : ''}`);
  const data = await res.json();
  return {
    comments: (data.comments as Record<string, unknown>[]).map(convertComment),
    nextCursor: data.next_cursor as string | null,
  };
}

export async function createComment(variantId: number, content: string): Promise<Comment> {
  const res = await apiFetch(`/variants/${variantId}/comments`, {
    method: 'POST',
    body: JSON.stringify({ content }),
  });
  const data = await res.json();
  return convertComment(data);
}

export async function deleteComment(commentId: number): Promise<void> {
  await apiFetch(`/comments/${commentId}`, {
    method: 'DELETE',
  });
}

// Email & Password Recovery API
export async function setEmail(email: string): Promise<{ message: string }> {
  const res = await apiFetch('/auth/set-email', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
  return res.json();
}

export async function verifyEmail(token: string): Promise<{ message: string }> {
  const res = await apiFetch('/auth/verify-email', {
    method: 'POST',
    body: JSON.stringify({ token }),
  });
  return res.json();
}

export async function resendVerification(): Promise<{ message: string }> {
  const res = await apiFetch('/auth/resend-verification', {
    method: 'POST',
    body: JSON.stringify({}),
  });
  return res.json();
}

export async function forgotPassword(identifier: string): Promise<{ message: string }> {
  const res = await apiFetch('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ identifier }),
  });
  return res.json();
}

export async function resetPassword(token: string, password: string): Promise<{ message: string }> {
  const res = await apiFetch('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({ token, password }),
  });
  return res.json();
}
