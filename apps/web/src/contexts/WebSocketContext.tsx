import { createContext, useContext, useEffect, useRef, useCallback, type ReactNode } from 'react';
import { useGameStore } from '../stores/gameStore';
import { fromRustGameInfo, fromRustMovesFrom } from '../lib/convert';
import type { ClientRequest } from '../types/chess';

// Use ws:// for localhost, wss:// for production with HTTPS
// Can be overridden with VITE_WS_URL environment variable
const isSecure = window.location.protocol === 'https:';
const WS_URL = import.meta.env.VITE_WS_URL
  ? import.meta.env.VITE_WS_URL
  : import.meta.env.DEV
    ? `ws://${window.location.hostname}:3030/ws`
    : `${isSecure ? 'wss' : 'ws'}://${window.location.host}/ws`;

interface WebSocketContextValue {
  sendMessage: (request: ClientRequest) => void;
}

const WebSocketContext = createContext<WebSocketContextValue | null>(null);

export function WebSocketProvider({ children }: { children: ReactNode }) {
  const wsRef = useRef<WebSocket | null>(null);
  const messageQueueRef = useRef<string[]>([]);
  const reconnectTimeoutRef = useRef<number | null>(null);

  const {
    setConnected,
    setRoomList,
    setGameInfo,
    setPlayerList,
    setMovesFrom,
    setCurrentRoom,
    addChatMessage,
    reset,
  } = useGameStore();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMessage = useCallback((message: any) => {
    switch (message.type) {
      case 'RoomList':
        setRoomList(message.content);
        break;

      case 'RoomCreateSuccess':
        setCurrentRoom(message.content);
        break;

      case 'RemovedFromRoom':
        reset();
        break;

      case 'GameInfo':
        setGameInfo(fromRustGameInfo(message.content));
        break;

      case 'PlayerList':
        setPlayerList(message.content);
        break;

      case 'MovesFrom':
        setMovesFrom(fromRustMovesFrom(message.content));
        break;

      case 'ChatMessage':
        addChatMessage(message.content);
        break;

      case 'NoRoomFound':
        console.warn('Room not found');
        break;

      case 'CannotOverwriteRoom':
        console.warn('Cannot overwrite existing room');
        break;
    }
  }, [setRoomList, setCurrentRoom, setGameInfo, setPlayerList, setMovesFrom, addChatMessage, reset]);

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('WebSocket connected');
      setConnected(true);

      // Send any queued messages
      while (messageQueueRef.current.length > 0) {
        const msg = messageQueueRef.current.shift();
        if (msg) ws.send(msg);
      }
    };

    ws.onclose = (event) => {
      console.log('WebSocket disconnected - code:', event.code, 'reason:', event.reason, 'wasClean:', event.wasClean);
      setConnected(false);

      // Attempt to reconnect after 2 seconds
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      reconnectTimeoutRef.current = window.setTimeout(() => {
        console.log('Attempting to reconnect...');
        connect();
      }, 2000);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onmessage = (event) => {
      try {
        console.log('Received WebSocket message:', event.data);
        const message = JSON.parse(event.data);
        handleMessage(message);
      } catch (e) {
        console.error('Failed to parse message:', e);
      }
    };
  }, [setConnected, handleMessage]);

  const sendMessage = useCallback((request: ClientRequest) => {
    const json = JSON.stringify(request);
    console.log('Sending WebSocket message:', json);

    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(json);
    } else {
      console.log('WebSocket not open, queueing message');
      // Queue the message for when connection is established
      messageQueueRef.current.push(json);
    }
  }, []);

  // Connect on mount, never disconnect
  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      // Don't close WebSocket on unmount - keep it alive
    };
  }, [connect]);

  return (
    <WebSocketContext.Provider value={{ sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocket() {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
}
