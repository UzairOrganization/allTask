'use client'
import { useState } from 'react';
import { 
  Search, MessageSquare, ChevronRight, ChevronDown,
  Send, Paperclip, Smile, MoreVertical, ArrowLeft
} from 'lucide-react';

const ChatPage = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');
  
  // Dummy chat data
  const chats = [
    {
      id: 1,
      clientName: 'John Smith',
      lastMessage: 'When can you start the work?',
      time: '10:30 AM',
      unread: 2,
      service: 'Handyman - Door Repair',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      messages: [
        { id: 1, sender: 'client', text: 'Hi, my front door needs repair', time: '10:15 AM' },
        { id: 2, sender: 'client', text: 'The lock is jammed and the hinge is loose', time: '10:16 AM' },
        { id: 3, sender: 'me', text: 'I can come tomorrow between 2-4 PM', time: '10:25 AM' },
        { id: 4, sender: 'client', text: 'When can you start the work?', time: '10:30 AM' },
      ]
    },
    {
      id: 2,
      clientName: 'Sarah Johnson',
      lastMessage: 'Thanks for the quick response!',
      time: '9:45 AM',
      unread: 0,
      service: 'Cleaning - Deep Cleaning',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      messages: [
        { id: 1, sender: 'client', text: 'I need deep cleaning for my apartment', time: '9:30 AM' },
        { id: 2, sender: 'me', text: 'I have availability this weekend', time: '9:40 AM' },
        { id: 3, sender: 'client', text: 'Thanks for the quick response!', time: '9:45 AM' },
      ]
    },
    {
      id: 3,
      clientName: 'Michael Brown',
      lastMessage: 'What materials will you bring?',
      time: 'Yesterday',
      unread: 1,
      service: 'Handyman - Small Repairs',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      messages: [
        { id: 1, sender: 'client', text: 'I have several small repairs needed', time: 'Yesterday, 4:20 PM' },
        { id: 2, sender: 'me', text: 'I can handle all of those. What day works for you?', time: 'Yesterday, 4:35 PM' },
        { id: 3, sender: 'client', text: 'What materials will you bring?', time: 'Yesterday, 5:10 PM' },
      ]
    }
  ];

  const handleSendMessage = () => {
    if (message.trim() === '') return;
    
    const updatedChats = chats.map(chat => {
      if (chat.id === activeChat.id) {
        const newMessage = {
          id: chat.messages.length + 1,
          sender: 'me',
          text: message,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        return {
          ...chat,
          messages: [...chat.messages, newMessage],
          lastMessage: message,
          time: 'Just now'
        };
      }
      return chat;
    });
    
    setMessage('');
    // In a real app, you would update state here
  };

  return (
    <div className="flex  bg-gray-50 h-[90vh]">
      {/* Left Sidebar - Inbox */}
      <div className={`${activeChat ? 'hidden md:block' : 'block'} w-full md:w-80 bg-white border-r border-gray-200 flex flex-col`}>
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">Messages</h1>
          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {chats.map(chat => (
            <div 
              key={chat.id}
              className={`p-4 border-b border-gray-200 flex items-center cursor-pointer hover:bg-gray-50 ${activeChat?.id === chat.id ? 'bg-green-50' : ''}`}
              onClick={() => setActiveChat(chat)}
            >
              <div className="relative mr-3">
                <img 
                  src={chat.avatar} 
                  alt={chat.clientName}
                  className="h-12 w-12 rounded-full object-cover"
                />
                {chat.unread > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                    {chat.unread}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-900 truncate">{chat.clientName}</h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap">{chat.time}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                <p className="text-xs text-green-700 font-medium truncate">{chat.service}</p>
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
            <img 
              src={activeChat.avatar} 
              alt={activeChat.clientName}
              className="h-10 w-10 rounded-full object-cover mr-3"
            />
            <div className="flex-1">
              <h2 className="font-bold text-gray-900">{activeChat.clientName}</h2>
              <p className="text-xs text-gray-500">{activeChat.service}</p>
            </div>
            <button className="text-gray-500 hover:text-gray-700">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
            <div className="space-y-3">
              {activeChat.messages.map(msg => (
                <div 
                  key={msg.id}
                  className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${msg.sender === 'me' ? 'bg-green-600 text-white' : 'bg-white text-gray-800 border border-gray-200'}`}
                  >
                    <p>{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-green-100' : 'text-gray-500'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center">
              <button className="text-gray-500 hover:text-gray-700 mr-2">
                <Paperclip className="h-5 w-5" />
              </button>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
              <button className="text-gray-500 hover:text-gray-700 mx-2">
                <Smile className="h-5 w-5" />
              </button>
              <button 
                onClick={handleSendMessage}
                className="bg-green-600 text-white rounded-full p-2 hover:bg-green-700"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center bg-gray-100">
          <div className="text-center p-6">
            <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700">Select a conversation</h3>
            <p className="text-gray-500 mt-1">Choose from your existing messages or start a new one</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;