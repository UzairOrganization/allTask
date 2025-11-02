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
    const { provider } = useSelector(state => state.auth);

    const [activeChat, setActiveChat] = useState(null);
    const activeChatRef = useRef(activeChat);
    const [currentSelectedChat, setCurrentSelectedChat] = useState({
        name: null,
        avatar: null
    })
    const [message, setMessage] = useState([]);
    const [messages, setMessages] = useState([]);
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(false);
    const [socketStatus, setSocketStatus] = useState('disconnected');
    const [isTyping, setIsTyping] = useState(false);
    const [typingUser, setTypingUser] = useState(null);
    const socketRef = useRef(null);
    const messagesEndRef = useRef(null);
    useEffect(() => {
        activeChatRef.current = activeChat; // Update ref when activeChat changes
    }, [activeChat]);
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
            if (provider) {
                socket.emit('authenticate', { providerId: provider._id });
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

        const handleNewMessage = (newMessage) => {
            console.log('Received message:', newMessage);

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

        // const handleTyping = (data) => {
        //     if (data.chatId === activeChat && data.userType === 'user') {
        //         setTypingUser(data.userId);
        //         setIsTyping(data.isTyping);

        //         if (data.isTyping) {
        //             const timer = setTimeout(() => {
        //                 setIsTyping(false);
        //                 setTypingUser(null);
        //             }, 3000);
        //             return () => clearTimeout(timer);
        //         }
        //     }
        // };

        socket.on('connect', handleConnect);
        socket.on('disconnect', handleDisconnect);
        socket.on('connect_error', handleConnectError);
        socket.on('new_message', handleNewMessage);

        // socket.on('typing_indicator', handleTyping);

        return () => {
            socket.off('connect', handleConnect);
            socket.off('disconnect', handleDisconnect);
            socket.off('connect_error', handleConnectError);
            socket.off('new_message', handleNewMessage);
            // socket.off('typing_indicator', handleTyping);
            socket.disconnect();
        };
    }, [provider]);

    // Fetch professional chats
    const fetchChats = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API}/api/chats/professional`, {
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

    }, [provider]);

    // Join chat and fetch messages when activeChat changes
    useEffect(() => {


        if (activeChat && socketStatus === 'connected') {
            joinChat(activeChat);

            fetchMessages(activeChat);
        }
    }, [activeChat, socketStatus]);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const joinChat = (chatId) => {
        if (socketRef.current?.connected) {
            socketRef.current.emit('join_chat', { paymentId: chatId });
        }
    };

    const fetchMessages = async (payment) => {
        try {
            const res = await axios.get(`${API}/api/chats/${payment}/messages`, {
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
            sender: provider._id,
            senderType: 'provider',
            createdAt: new Date(),
            read: false
        };

        // Optimistic update
        // setMessages(prev => [...prev, newMessage]);
        setMessage('');

        // Send via socket
        socketRef.current.emit('send_message', {
            payment: activeChat,
            text: message
        }, (ack) => {
            if (ack.status === 'error') {
                // Revert optimistic update if failed
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

    return (
        <div className="flex bg-gray-50 h-screen w-screen overflow-x-hidden">
            {/* Left Sidebar - Inbox */}
            <div className={`${activeChat ? 'hidden md:block' : 'block'} fixed top-0 left-0 h-screen z-20 w-full md:w-[20%] bg-white border-r border-gray-200 flex flex-col`}>
                <div className="p-4 border-b border-gray-200">
                    <h1 className="text-xl font-bold text-gray-800">Messages</h1>
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
                                onClick={() => {

                                    setActiveChat(chat.payment)
                                    setCurrentSelectedChat({ name: chat.user.name })
                                }}
                            >
                                <Avatar className="mr-3">
                                    <AvatarImage src={chat.user?.avatar} />
                                    <AvatarFallback>
                                        {getInitials(chat.user?.name)}
                                    </AvatarFallback>
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

            {/* Main Chat Area */}
            {activeChat ? (
                <div className="flex-1 ml-0 md:ml-[20%] h-screen flex flex-col relative">
                    {/* Chat Header */}
                    <div className="p-4 border-b flex items-center border-gray-200 bg-white sticky top-0 z-10">
                        <button
                            className="md:hidden mr-2 text-gray-500"
                            onClick={() => setActiveChat(null)}
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </button>
                        <Avatar className="mr-3">
                            <AvatarImage src={chats.find(c => c.payment === activeChat)?.user?.avatar} />
                            <AvatarFallback>
                                {getInitials(chats.find(c => c.payment === activeChat)?.user?.name)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <h2 className="font-bold text-gray-900">
                                {chats.find(c => c.payment === activeChat)?.user?.name}
                            </h2>
                            <div className="flex items-center">
                                <p className="text-xs text-gray-500 mr-2">
                                    {/* {socketStatus === 'connected' ? 'Online' : 'Offline'} */}
                                </p>
                                {isTyping && typingUser && (
                                    <p className="text-xs text-gray-500">Typing...</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    <ScrollArea className="flex-1 p-4 bg-gray-100">
                        {messages.map((msg) => (
                            <div
                                key={msg._id}
                                className={`flex mb-4 ${msg.sender === provider._id ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${msg.sender === provider._id
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white border border-gray-200'
                                    }`}>
                                    <p>{msg.content}</p>
                                    <p className={`text-xs mt-1 ${msg.sender === provider._id
                                        ? 'text-blue-100'
                                        : 'text-gray-500'
                                        }`}>
                                        {format(new Date(msg.createdAt), 'hh:mm a')}
                                    </p>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </ScrollArea>

                    {/* Message Input */}
                    <div className="p-4 border-t border-gray-200 sticky bottom-0 bg-white w-full">
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
                                disabled={socketStatus !== 'connected'}
                            >
                                <Send className="h-5 w-5" />
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
}