
import { io } from 'socket.io-client';
import { API } from '@/lib/data-service';

class SocketService {
  constructor() {
    this.socket = null;
  }

  connect() {
    if (!this.socket) {
      this.socket = io(API, {
        withCredentials: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 3000,
        transports: ['websocket'],
      });
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  joinConversation(conversationId) {
    if (this.socket) {
      this.socket.emit('join_conversation', conversationId);
    }
  }

  sendMessage(data, callback) {
    if (this.socket) {
      this.socket.emit('send_message', data, callback);
    }
  }

  onReceiveMessage(callback) {
    if (this.socket) {
      this.socket.on('receive_message', callback);
    }
  }

  removeListeners() {
    if (this.socket) {
      this.socket.off('receive_message');
    }
  }
}

export default new SocketService();
