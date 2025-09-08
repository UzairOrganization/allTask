'use client';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { API } from '@/lib/data-service';
import axios from 'axios';
import { Send, ChevronRight, ArrowLeft, MessageSquare } from 'lucide-react';
import { io } from 'socket.io-client';

export default function ProfessionalChatPage() {
  const { provider } = useSelector((state) => state.auth);

  const [activeChat, setActiveChat] = useState(null);
  const [currentSelectedChat, setCurrentSelectedChat] = useState({
    name: null,
    avatar: null,
  });
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [socketStatus, setSocketStatus] = useState('disconnected');
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState(null);

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  // SOCKET CONNECTION
  useEffect(() => {
    setSocketStatus('connecting');
    socketRef.current = io(`${API}`, {
      withCredentials: true,
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      transports: ['websocket'],
    });

    const socket = socketRef.current;

    const handleConnect = () => {
      setSocketStatus('connected');
      if (provider) {
        socket.emit('authenticate', { providerId: provider._id });
      }
      if (activeChat) joinChat(activeChat);
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', () => setSocketStatus('disconnected'));
    socket.on('connect_error', () => setSocketStatus('error'));

    socket.on('new_message', (newMessage) => {
      setMessages((prev) => [
        ...prev,
        {
          _id: newMessage._id,
          content: newMessage.content,
          sender: newMessage.sender,
          senderModel: newMessage.senderType,
          createdAt: newMessage.timestamp,
          read: newMessage.read,
        },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [provider, activeChat]);

  // FETCH CHATS
  const fetchChats = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/api/chats/professional`, {
        withCredentials: true,
      });
      setChats(res.data.data);
    } catch (err) {
      console.error('Error fetching chats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (provider) fetchChats();
  }, [provider]);

  // FETCH MESSAGES
  const joinChat = (chatId) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('join_chat', { paymentId: chatId });
    }
  };

  const fetchMessages = async (payment) => {
    try {
      const res = await axios.get(`${API}/api/chats/${payment}/messages`, {
        withCredentials: true,
      });
      setMessages(res.data.messages);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  useEffect(() => {
    if (activeChat && socketStatus === 'connected') {
      joinChat(activeChat);
      fetchMessages(activeChat);
    }
  }, [activeChat, socketStatus]);

  // AUTO-SCROLL
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim() || !activeChat) return;

    const newMessage = {
      _id: Date.now().toString(),
      content: message,
      sender: provider._id,
      senderType: 'provider',
      createdAt: new Date(),
      read: false,
    };

    setMessage('');
    socketRef.current.emit(
      'send_message',
      { payment: activeChat, text: message },
      (ack) => {
        if (ack.status === 'error') {
          setMessages((prev) => prev.filter((m) => m._id !== newMessage._id));
        }
      }
    );
  };

  const getInitials = (name) =>
    name
      ? name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2)
      : '';

  return (
    <div className="flex bg-gray-50 h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`${
          activeChat ? 'hidden md:flex' : 'flex'
        } fixed md:static top-0 left-0 h-screen z-20 w-full md:w-[22%] bg-white border-r border-gray-200 flex-col`}
      >
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">Messages</h1>
        </div>

        <ScrollArea className="flex-1">
          {loading ? (
            <p className="p-4 text-center">Loading conversations...</p>
          ) : chats.length === 0 ? (
            <p className="p-4 text-center text-gray-500">No chats available</p>
          ) : (
            chats.map((chat) => (
              <div
                key={chat._id}
                className={`p-4 border-b border-gray-200 flex items-center cursor-pointer hover:bg-gray-50 ${
                  activeChat === chat.payment ? 'bg-blue-50' : ''
                }`}
                onClick={() => {
                  setActiveChat(chat.payment);
                  setCurrentSelectedChat({ name: chat.user.name });
                }}
              >
                <Avatar className="mr-3">
                  <AvatarImage src={chat.user?.avatar} />
                  <AvatarFallback>{getInitials(chat.user?.name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-gray-900 truncate">
                      {chat.user?.name}
                    </h3>
                    {chat.unreadCount > 0 && (
                      <span className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 truncate">
                    {chat.lastMessage?.text || chat.serviceRequest?.type}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 ml-2" />
              </div>
            ))
          )}
        </ScrollArea>
      </div>

      {/* Chat Area */}
      {activeChat ? (
        <div className="flex-1 md:ml-[22%] flex flex-col h-screen">
          {/* Header */}
          <div className="p-4 border-b flex items-center bg-white sticky top-0 z-10">
            <button
              className="md:hidden mr-2 text-gray-500"
              onClick={() => setActiveChat(null)}
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <Avatar className="mr-3">
              <AvatarImage
                src={chats.find((c) => c.payment === activeChat)?.user?.avatar}
              />
              <AvatarFallback>
                {getInitials(
                  chats.find((c) => c.payment === activeChat)?.user?.name
                )}
              </AvatarFallback>
            </Avatar>
            <h2 className="font-bold text-gray-900 truncate">
              {chats.find((c) => c.payment === activeChat)?.user?.name}
            </h2>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4 bg-gray-100">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`flex mb-4 ${
                  msg.sender === provider._id
                    ? 'justify-end'
                    : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                    msg.sender === provider._id
                      ? 'bg-blue-500 text-white'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  <p>{msg.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      msg.sender === provider._id
                        ? 'text-blue-100'
                        : 'text-gray-500'
                    }`}
                  >
                    {format(new Date(msg.createdAt), 'hh:mm a')}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t bg-white sticky bottom-0">
            <div className="flex items-center">
              <Input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1"
                disabled={socketStatus !== 'connected'}
              />
              <Button
                onClick={handleSendMessage}
                className="ml-2"
                disabled={socketStatus !== 'connected'}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Status: {socketStatus}
            </p>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center bg-gray-100">
          <div className="text-center p-6">
            <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700">
              Select a conversation
            </h3>
            <p className="text-gray-500 mt-1">Status: {socketStatus}</p>
          </div>
        </div>
      )}
    </div>
  );
}
