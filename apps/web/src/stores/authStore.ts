import { create } from 'zustand';
import type { User } from '../types/api';

interface AuthStore {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

const STORAGE_KEY = 'protochess_auth';

function loadFromStorage(): { token: string | null; user: User | null } {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { token: parsed.token || null, user: parsed.user || null };
    }
  } catch {
    // ignore
  }
  return { token: null, user: null };
}

function saveToStorage(token: string | null, user: User | null) {
  if (token && user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ token, user }));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

const initial = loadFromStorage();

export const useAuthStore = create<AuthStore>((set, get) => ({
  token: initial.token,
  user: initial.user,

  setAuth: (token, user) => {
    saveToStorage(token, user);
    set({ token, user });
  },

  logout: () => {
    saveToStorage(null, null);
    set({ token: null, user: null });
  },

  isAuthenticated: () => {
    return get().token !== null && get().user !== null;
  },
}));
