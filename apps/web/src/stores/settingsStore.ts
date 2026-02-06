import { create } from 'zustand';

interface SettingsStore {
  soundEnabled: boolean;
  darkMode: boolean;
  toggleSound: () => void;
  toggleDarkMode: () => void;
}

const STORAGE_KEY = 'protochess_settings';

function loadFromStorage(): { soundEnabled: boolean; darkMode: boolean } {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        soundEnabled: parsed.soundEnabled ?? true,
        darkMode: parsed.darkMode ?? false,
      };
    }
  } catch {
    // ignore
  }
  return { soundEnabled: true, darkMode: false };
}

function saveToStorage(settings: { soundEnabled: boolean; darkMode: boolean }) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

function syncDarkClass(dark: boolean) {
  document.documentElement.classList.toggle('dark', dark);
}

const initial = loadFromStorage();

// Apply dark mode class on load
syncDarkClass(initial.darkMode);

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  soundEnabled: initial.soundEnabled,
  darkMode: initial.darkMode,

  toggleSound: () => {
    const s = get();
    const newValue = !s.soundEnabled;
    saveToStorage({ soundEnabled: newValue, darkMode: s.darkMode });
    set({ soundEnabled: newValue });
  },

  toggleDarkMode: () => {
    const s = get();
    const newValue = !s.darkMode;
    syncDarkClass(newValue);
    saveToStorage({ soundEnabled: s.soundEnabled, darkMode: newValue });
    set({ darkMode: newValue });
  },
}));
