import type { GameState } from './chess';

export interface User {
  id: number;
  username: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface MeResponse {
  id: number;
  username: string;
  created_at: string;
  email?: string;
  email_verified?: boolean;
}

export interface VariantSummary {
  id: number;
  name: string;
  description: string;
  author: User;
  boardWidth: number;
  boardHeight: number;
  pieceCount: number;
  likeCount: number;
  commentCount: number;
  liked: boolean;
  gameState: GameState;
  createdAt: string;
  updatedAt: string;
}

export interface VariantListResponse {
  variants: VariantSummary[];
  nextCursor: string | null;
}

export interface Comment {
  id: number;
  author: User;
  content: string;
  createdAt: string;
}

export interface CommentListResponse {
  comments: Comment[];
  nextCursor: string | null;
}

export interface LikeResponse {
  likeCount: number;
  liked: boolean;
}
