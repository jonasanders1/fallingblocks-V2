import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3000';

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Create socket connection
    if (!socketRef.current) {
      socketRef.current = io(SOCKET_URL, {
        reconnectionDelay: 1000,
        reconnection: true,
        reconnectionAttempts: 10,
        transports: ['websocket', 'polling'],
        agent: false,
        upgrade: true,
        rejectUnauthorized: false,
      });

      // Connection event handlers
      socketRef.current.on('connect', () => {
        console.log('Connected to socket server');
      });

      socketRef.current.on('connect_error', (error) => {
        console.error('Socket connection error:', error.message);
      });
    }

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  return socketRef.current;
}; 