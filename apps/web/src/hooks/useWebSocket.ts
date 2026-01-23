import { useEffect, useRef, useCallback } from 'react';
import { useGameStore } from '../stores/gameStore';
import type { ClientRequest, ClientResponse } from '../types/chess';

const WS_URL = import.meta.env.DEV
  ? `ws://${window.location.hostname}:3030/ws`
  : `wss://${window.location.host}/ws`;

export function useWebSocket() {
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

    ws.onclose = () => {
      console.log('WebSocket disconnected');
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
        const message: ClientResponse = JSON.parse(event.data);
        handleMessage(message);
      } catch (e) {
        console.error('Failed to parse message:', e);
      }
    };
  }, [setConnected]);

  const handleMessage = useCallback(
    (message: ClientResponse) => {
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
          setGameInfo(message.content);
          break;

        case 'PlayerList':
          setPlayerList(message.content);
          break;

        case 'MovesFrom':
          setMovesFrom(message.content);
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
    },
    [setRoomList, setCurrentRoom, setGameInfo, setPlayerList, setMovesFrom, addChatMessage, reset]
  );

  const sendMessage = useCallback((request: ClientRequest) => {
    const json = JSON.stringify(request);

    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(json);
    } else {
      // Queue the message for when connection is established
      messageQueueRef.current.push(json);
    }
  }, []);

  // Connect on mount
  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [connect]);

  return { sendMessage };
}
