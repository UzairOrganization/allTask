'use client'
import { useEffect, useRef, useState } from 'react';
import { MessageSquare, ChevronRight, Send, ArrowLeft, Menu } from 'lucide-react';
import axios from 'axios';
import { API } from '@/lib/data-service';
import { io } from 'socket.io-client';

const ChatPage = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [socketStatus, setSocketStatus] = useState('disconnected');
  const [messages, setMessages] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
      transports: ['websocket']
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
      setSidebarOpen(false); // Close sidebar on mobile when chat is selected
    }
  }, [activeChat, socketStatus]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarOpen && window.innerWidth < 768) {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar && !sidebar.contains(event.target)) {
          setSidebarOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen]);

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

      setMessages(prev => [...prev, newMessage]);
      setMessage('');

      socketRef.current.emit(
        'send_private_message',
        { text: message },
        (ack) => {
          if (ack.status === 'error') {
            setMessages(prev => prev.filter(m => m._id !== tempId));
          }
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
    <div className="flex bg-gray-50 h-[90vh] relative">
      {/* Mobile menu button */}
      {!sidebarOpen && (
        <button
          className="md:hidden fixed top-4 left-4 z-30 bg-white p-2 rounded-md shadow-md"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </button>
      )}

      {/* Left Sidebar - Inbox */}
      <div className={`sidebar ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} 
        fixed md:relative top-0 left-0 h-full z-20 w-4/5 md:w-80 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out`}>
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Messages</h1>
          <button 
            className="md:hidden p-1 rounded-md hover:bg-gray-100"
            onClick={() => setSidebarOpen(false)}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center">Loading conversations...</div>
          ) : conversations.map(conversation => (
            <div
              key={conversation._id}
              className={`p-4 border-b border-gray-200 flex items-center cursor-pointer hover:bg-gray-50 ${activeChat?._id === conversation._id ? 'bg-green-50' : ''}`}
              onClick={() => {
                setActiveChat(conversation);
                setSidebarOpen(false);
              }}
            >
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex justify-center items-center p-2 border mr-3 bg-gray-100">
                <span className="text-black text-lg md:text-xl uppercase font-bold">
                  {getInitials(conversation.user.name)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-900 truncate text-sm md:text-base">
                    {conversation.user.name}
                  </h3>
                </div>
                <p className="text-xs text-green-700 font-medium truncate">
                  {conversation.lead.serviceType}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-gray-400 ml-2" />
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
              className="md:hidden mr-3 text-gray-500 p-1 rounded-md hover:bg-gray-100"
              onClick={() => setActiveChat(null)}
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex justify-center items-center p-2 border bg-gray-100">
              <span className="text-black text-lg md:text-xl uppercase font-bold">
                {getInitials(activeChat.user.name)}
              </span>
            </div>
            <div className="flex-1 ml-3">
              <h2 className="font-bold text-gray-900 text-base md:text-lg">{activeChat.user.name}</h2>
              <p className="text-xs text-gray-500">
                {activeChat.lead.serviceType}
              </p>
            </div>
            <button
              className="md:hidden p-1 rounded-md hover:bg-gray-100"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
            <div className="space-y-3">
              {messages.map((msg) => (
                <div key={msg._id} className={`flex ${msg.senderId === activeChat.provider._id ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs md:max-w-md rounded-lg px-3 py-2 text-sm md:text-base ${msg.senderId === activeChat.provider._id
                    ? 'bg-green-600 text-white'
                    : 'bg-white border border-gray-200'
                    }`}>
                    <p>{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.senderId === activeChat.provider._id
                      ? 'text-green-100'
                      : 'text-gray-500'
                      }`}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
                className="flex-1 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-sm md:text-base"
                disabled={socketStatus !== 'connected'}
              />
              <button
                onClick={handleSendMessage}
                className="bg-green-600 ml-2 text-white rounded-full p-2 hover:bg-green-700 disabled:bg-gray-400 transition-colors"
                disabled={!message.trim() || socketStatus !== 'connected'}
              >
                <Send className="h-4 w-4 md:h-5 md:w-5" />
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
        <div className="flex-1 items-center justify-center bg-gray-100 hidden md:flex">
          <div className="text-center p-6">
            <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700">Select a conversation</h3>
            <p className="text-gray-500 mt-1">Choose a chat from the sidebar to start messaging</p>
            <p className="text-xs text-gray-400 mt-2">Status: {socketStatus}</p>
          </div>
        </div>
      )}

      {/* Empty state for mobile */}
      {!activeChat && (
        <div className="md:hidden flex-1 flex items-center justify-center bg-gray-100 p-4">
          <div className="text-center">
            <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-base font-medium text-gray-700">No conversation selected</h3>
            <p className="text-sm text-gray-500 mt-1">Tap the menu icon to view your conversations</p>
            <button 
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md text-sm"
              onClick={() => setSidebarOpen(true)}
            >
              Open Conversations
            </button>
          </div>
        </div>
      )}

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default ChatPage;