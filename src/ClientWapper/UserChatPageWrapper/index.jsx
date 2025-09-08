'use client';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { API } from '@/lib/data-service';
import axios from 'axios';
import { Send, ChevronRight, ArrowLeft, MessageSquare, Menu, X } from 'lucide-react';
import { io } from 'socket.io-client';

export default function UserChatPage() {
  const { user } = useSelector((state) => state.auth);
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [socketStatus, setSocketStatus] = useState('disconnected');
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState(null);
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
      setSocketStatus('connected');
      if (user._id) {
        socket.emit('authenticate', { userId: user._id });
      }
      if (activeChat) {
        joinChat(activeChat);
      }
    };

    const handleDisconnect = (reason) => {
      setSocketStatus('disconnected');
      if (reason === 'io server disconnect') {
        socket.connect();
      }
    };

    const handleConnectError = (error) => {
      setSocketStatus('error');
    };

    // Update the handleNewMessage function to properly handle the message structure:
    const handleNewMessage = (newMessage) => {
      // Make sure we're adding to the correct chat
      setMessages(prev => [...prev, {
        _id: newMessage._id,
        content: newMessage.content,
        sender: newMessage.sender,
        senderModel: newMessage.senderType,
        receiver: newMessage.receiver,
        receiverModel: newMessage.receiverModel,
        createdAt: newMessage.timestamp,
        read: newMessage.read
      }]);
    };

    const handleTyping = (data) => {
      if (data.chatId === activeChat && data.userType === 'provider') {
        setTypingUser(data.userId);
        setIsTyping(data.isTyping);

        if (data.isTyping) {
          const timer = setTimeout(() => {
            setIsTyping(false);
            setTypingUser(null);
          }, 3000);
          return () => clearTimeout(timer);
        }
      }
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('connect_error', handleConnectError);
    socket.on('new_message', handleNewMessage);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('connect_error', handleConnectError);
      socket.off('new_message', handleNewMessage);
      socket.disconnect();
    };
  }, [user]);

  // Fetch user chats
  const fetchChats = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/api/chats/user`, {
        withCredentials: true
      });
      setChats(res.data.data);
    } catch (error) {
      console.error('Error fetching chats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, [user]);

  // Join chat and fetch messages when activeChat changes
  useEffect(() => {
    if (activeChat && socketStatus === 'connected') {
      joinChat(activeChat);
      fetchMessages(activeChat);
      setSidebarOpen(false); // Close sidebar on mobile when chat is selected
    }
  }, [activeChat, socketStatus]);

  // Auto-scroll to bottom when messages change
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

  const joinChat = (payment) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('join_chat', { paymentId: payment });
    }
  };

  const fetchMessages = async (payment) => {
    try {
      const res = await axios.get(`${API}/api/chats/${payment}/messages/users`, {
        withCredentials: true
      });
      setMessages(res.data.messages);
      setTimeout(async () => {
        await fetchChats()
      }, 2000);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = () => {
    if (!message.trim() || !activeChat || !socketRef.current?.connected) return;

    const tempId = Date.now().toString();
    const newMessage = {
      _id: tempId,
      content: message,
      sender: user._id,
      senderType: 'user',
      createdAt: new Date(),
      read: false
    };

    setMessage('');

    // Send via socket
    socketRef.current.emit('send_message', {
      payment: activeChat,
      text: message
    }, (ack) => {
      if (ack.status === 'error') {
        setMessages(prev => prev.filter(m => m._id !== tempId));
      }
    });
  };

  const handleTyping = (isTyping) => {
    if (!activeChat || !socketRef.current?.connected) return;
    socketRef.current.emit('typing', {
      chatId: activeChat,
      isTyping
    });
  };

  const getInitials = (name) => {
    if (!name) return '';
    const words = name.split(' ');
    return words.map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex bg-gray-50 h-screen w-full overflow-hidden">
      {/* Mobile menu button */}
      {!sidebarOpen && (
        <button
          className="md:hidden fixed top-4 left-4 z-30 bg-white p-2 rounded-md shadow-md"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </button>
      )}

      {/* Left Sidebar - Inbox */}
      <div className={`sidebar ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} 
        fixed md:relative top-0 left-0 h-full z-20 w-4/5 md:w-1/3 lg:w-1/4 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out`}>
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">Messages</h1>
          <button 
            className="md:hidden p-1 rounded-md hover:bg-gray-100"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <ScrollArea className="flex-1">
          {loading ? (
            <div className="p-4 text-center">Loading conversations...</div>
          ) : chats.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No chats available</div>
          ) : (
            chats.map(chat => (
              <div
                key={chat._id}
                className={`p-4 border-b border-gray-200 flex items-center cursor-pointer hover:bg-gray-50 ${activeChat === chat.payment ? 'bg-blue-50' : ''}`}
                onClick={() => setActiveChat(chat.payment)}
              >
                <Avatar className="mr-3 h-10 w-10">
                  <AvatarImage src={chat.provider?.avatar} />
                  <AvatarFallback>
                    {getInitials(chat.provider?.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-gray-900 truncate text-sm md:text-base">
                      {chat.provider?.name}
                    </h3>
                    {chat.unreadCount > 0 && (
                      <span className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 truncate">
                    {chat.serviceRequest?.type}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 ml-2" />
              </div>
            ))
          )}
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      {activeChat ? (
        <div className="flex-1 h-full flex flex-col relative w-full">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 bg-white flex items-center sticky top-0 z-10">
            <button
              className="md:hidden mr-3 text-gray-500 p-1 rounded-md hover:bg-gray-100"
              onClick={() => setActiveChat(null)}
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <Avatar className="mr-3 h-10 w-10">
              <AvatarImage src={chats.find(c => c.payment === activeChat)?.provider?.avatar} />
              <AvatarFallback>
                {getInitials(chats.find(c => c.payment === activeChat)?.provider?.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="font-bold text-gray-900 text-sm md:text-base">
                {chats.find(c => c.payment === activeChat)?.provider?.name}
              </h2>
              <p className="text-xs text-gray-500">
                {chats.find(c => c.payment === activeChat)?.serviceRequest?.type}
              </p>
            </div>
            <button
              className="md:hidden p-1 rounded-md hover:bg-gray-100"
              onClick={toggleSidebar}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4 bg-gray-100">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`flex ${msg.sender === user._id ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${msg.sender === user._id
                    ? 'bg-blue-500 text-white'
                    : 'bg-white border border-gray-200'
                    }`}>
                    <p className="text-sm md:text-base">{msg.content}</p>
                    <p className={`text-xs mt-1 ${msg.sender === user._id
                      ? 'text-blue-100'
                      : 'text-gray-500'
                      }`}>
                      {format(new Date(msg.createdAt), 'hh:mm a')}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-lg px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200 bg-white sticky bottom-0">
            <div className="flex items-center">
              <Input
                type="text"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  handleTyping(true);
                }}
                onBlur={() => handleTyping(false)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleTyping(false);
                    handleSendMessage();
                  }
                }}
                placeholder="Type a message..."
                className="flex-1"
                disabled={socketStatus !== 'connected'}
              />
              <Button
                onClick={handleSendMessage}
                className="ml-2"
                disabled={socketStatus !== 'connected' || !message.trim()}
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
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
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md text-sm"
              onClick={toggleSidebar}
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
}