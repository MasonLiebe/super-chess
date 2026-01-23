import { create } from 'zustand';
import type { GameInfo, PlayerList, RoomInfo, MovesFrom } from '../types/chess';

interface GameStore {
  // Connection state
  connected: boolean;
  setConnected: (connected: boolean) => void;

  // Room state
  currentRoom: string | null;
  setCurrentRoom: (room: string | null) => void;
  roomList: RoomInfo[];
  setRoomList: (rooms: RoomInfo[]) => void;

  // Game state
  gameInfo: GameInfo | null;
  setGameInfo: (info: GameInfo | null) => void;

  // Player state
  playerList: PlayerList | null;
  setPlayerList: (list: PlayerList | null) => void;

  // Move highlighting
  movesFrom: MovesFrom | null;
  setMovesFrom: (moves: MovesFrom | null) => void;
  selectedSquare: [number, number] | null;
  setSelectedSquare: (square: [number, number] | null) => void;

  // Chat
  chatMessages: { from: string; content: string }[];
  addChatMessage: (message: { from: string; content: string }) => void;
  clearChat: () => void;

  // Reset
  reset: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
  // Connection
  connected: false,
  setConnected: (connected) => set({ connected }),

  // Room
  currentRoom: null,
  setCurrentRoom: (currentRoom) => set({ currentRoom }),
  roomList: [],
  setRoomList: (roomList) => set({ roomList }),

  // Game
  gameInfo: null,
  setGameInfo: (gameInfo) => set({ gameInfo }),

  // Players
  playerList: null,
  setPlayerList: (playerList) => set({ playerList }),

  // Moves
  movesFrom: null,
  setMovesFrom: (movesFrom) => set({ movesFrom }),
  selectedSquare: null,
  setSelectedSquare: (selectedSquare) => set({ selectedSquare }),

  // Chat
  chatMessages: [],
  addChatMessage: (message) =>
    set((state) => ({
      chatMessages: [...state.chatMessages, message].slice(-100), // Keep last 100 messages
    })),
  clearChat: () => set({ chatMessages: [] }),

  // Reset
  reset: () =>
    set({
      currentRoom: null,
      gameInfo: null,
      playerList: null,
      movesFrom: null,
      selectedSquare: null,
      chatMessages: [],
    }),
}));
