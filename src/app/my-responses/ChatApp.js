'use client'
import { useEffect, useRef, useState } from 'react';
import { MessageSquare, ChevronRight, Send, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { API } from '@/lib/data-service';
import { io } from 'socket.io-client';

const ChatPage = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [socketStatus, setSocketStatus] = useState('disconnected'); // 'connecting', 'connected', 'error'
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Initialize socket connection
  useEffect(() => {
    setSocketStatus('connecting');

    socketRef.current = io(`${API}`, {
      withCredentials: true,
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      transports: ['websocket'] // Force WebSocket transport
    });

    const socket = socketRef.current;

    const handleConnect = () => {
      console.log('Socket connected successfully');
      setSocketStatus('connected');
      if (activeChat) {
        joinConversation(activeChat);
      }
    };

    const handleDisconnect = (reason) => {
      console.log('Socket disconnected:', reason);
      setSocketStatus('disconnected');
      if (reason === 'io server disconnect') {
        // The server explicitly disconnected, try to reconnect
        socket.connect();
      }
    };

    const handleConnectError = (error) => {
      setSocketStatus('error');
    };

    const handleConversationHistory = (history) => {
      setMessages(history);
    };

    const handleNewMessage = (newMessage) => {
      console.log('Received new message:', newMessage);
      setMessages(prev => [...prev, newMessage]);
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('connect_error', handleConnectError);
    socket.on('conversation_history', handleConversationHistory);
    socket.on('receive_private_message', handleNewMessage);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('connect_error', handleConnectError);
      socket.off('conversation_history', handleConversationHistory);
      socket.off('receive_private_message', handleNewMessage);
      socket.disconnect();
    };
  }, []);

  // Fetch conversations
  useEffect(() => {
    const fetchConversations = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API}/api/conversations/provider/conversations`, {
          withCredentials: true
        });
        setConversations(response.data);
      } catch (error) {
        console.error('Failed to fetch conversations:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchConversations();
  }, []);

  // Join conversation when activeChat changes
  useEffect(() => {
    if (activeChat && socketStatus === 'connected') {
      joinConversation(activeChat);
    }
  }, [activeChat, socketStatus]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const joinConversation = (conversation) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('join_conversation', {
        conversationId: conversation._id,
        userId: conversation.user._id,
        providerId: conversation.provider._id
      }, (response) => {
        console.log('Join conversation response:', response);
      });
    }
  };

  const handleSendMessage = () => {
    if (message.trim() && activeChat && socketRef.current?.connected) {
      const tempId = Date.now();
      const newMessage = {
        _id: tempId,
        text: message,
        senderId: activeChat.provider._id,
        timestamp: new Date().toISOString()
      };

      // Optimistic update
      setMessages(prev => [...prev, newMessage]);
      setMessage('');

      socketRef.current.emit(
        'send_private_message',
        { text: message },
        (ack) => {
          if (ack.status === 'error') {
            // Handle error case - maybe revert optimistic update
            setMessages(prev => prev.filter(m => m._id !== tempId));
          }
          // If success, the optimistic update remains
        }
      );
    }
  };

  const getInitials = (name) => {
    if (!name) return '';
    const words = name.split(' ');
    return words.map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="flex bg-gray-50 h-[90vh]">
      {/* Left Sidebar - Inbox */}
      <div className={`${activeChat ? 'hidden md:block' : 'block'} w-full md:w-80 bg-white border-r border-gray-200 flex flex-col`}>
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">Messages</h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center">Loading conversations...</div>
          ) : conversations.map(conversation => (
            <div
              key={conversation._id}
              className={`p-4 border-b border-gray-200 flex items-center cursor-pointer hover:bg-gray-50 ${activeChat?._id === conversation._id ? 'bg-green-50' : ''}`}
              onClick={() => setActiveChat(conversation)}
            >
              <div className="w-16 h-16 rounded-full flex justify-center items-center p-2 border mr-3">
                <span className="text-black text-xl uppercase font-bold">
                  {getInitials(conversation.user.name)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-900 truncate">
                    {conversation.user.name}
                  </h3>
                </div>
                <p className="text-xs text-green-700 font-medium truncate">
                  {conversation.lead.serviceType}
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400 ml-2" />
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      {activeChat ? (
        <div className="flex-1 flex flex-col h-[90vh]">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 bg-white flex items-center">
            <button
              className="md:hidden mr-2 text-gray-500"
              onClick={() => setActiveChat(null)}
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="w-16 h-16 rounded-full flex justify-center items-center p-2 border">
              <span className="text-black text-xl uppercase font-bold">
                {getInitials(activeChat.user.name)}
              </span>
            </div>
            <div className="flex-1 ml-2">
              <h2 className="font-bold text-gray-900">{activeChat.user.name}</h2>
              <p className="text-xs text-gray-500">
                {activeChat.lead.serviceType}
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
            <div className="space-y-3">
              {messages.map((msg) => (
                <div key={msg._id} className={`flex ${msg.senderId === activeChat.provider ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${msg.senderId === activeChat.provider
                    ? 'bg-green-600 text-white'
                    : 'bg-white border border-gray-200'
                    }`}>
                    <p>{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.senderId === activeChat.provider
                      ? 'text-green-100'
                      : 'text-gray-500'
                      }`}>
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                disabled={socketStatus !== 'connected'}
              />
              <button
                onClick={handleSendMessage}
                className="bg-green-600 ml-2 text-white rounded-full p-2 hover:bg-green-700 disabled:bg-gray-400"
                disabled={!message.trim() || socketStatus !== 'connected'}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-1 text-xs">
              {socketStatus === 'connecting' && (
                <p className="text-blue-500">Connecting to chat server...</p>
              )}
              {socketStatus === 'error' && (
                <p className="text-red-500">Connection failed. Trying to reconnect...</p>
              )}
              {socketStatus === 'connected' && (
                <p className="text-green-500">Connected</p>
              )}
              {socketStatus === 'disconnected' && (
                <p className="text-yellow-500">Disconnected</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center bg-gray-100">
          <div className="text-center p-6">
            <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700">Select a conversation</h3>
            <p className="text-gray-500 mt-1">Status: {socketStatus}</p>
          </div>
        </div>
      )}
    </div>

  );
};

export default ChatPage;