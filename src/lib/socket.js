import { io } from 'socket.io-client';
import { API } from './data-service';

let socket;

export const initializeSocket = (token) => {
  if (!socket) {
    socket = io(API, {
      auth: { token },
      autoConnect: false,
      reconnectionAttempts: 5,
      reconnectionDelay: 5000,
    });
  }
  return socket;
};

export const getSocket = () => {
  if (!socket) throw new Error('Socket not initialized');
  return socket;
};