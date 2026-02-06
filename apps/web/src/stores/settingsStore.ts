import { create } from 'zustand';

interface SettingsStore {
  soundEnabled: boolean;
  toggleSound: () => void;
}

const STORAGE_KEY = 'protochess_settings';

function loadFromStorage(): { soundEnabled: boolean } {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { soundEnabled: parsed.soundEnabled ?? true };
    }
  } catch {
    // ignore
  }
  return { soundEnabled: true };
}

function saveToStorage(settings: { soundEnabled: boolean }) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

const initial = loadFromStorage();

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  soundEnabled: initial.soundEnabled,

  toggleSound: () => {
    const newValue = !get().soundEnabled;
    saveToStorage({ soundEnabled: newValue });
    set({ soundEnabled: newValue });
  },
}));
