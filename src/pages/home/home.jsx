import React, { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import SideBar from './sideBar';
import { FiSend } from 'react-icons/fi';
import useConversation from '../../context/useConversation';
import useSendMessage from '../../hooks/useSendMessage';
import useGetMessages from '../../hooks/useGetMessages';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useSocketContext } from '../../context/SocketContext';
import useListenMessages from '../../hooks/useListenMessages';

dayjs.extend(relativeTime);

function formatTimestamp(timestamp) {
  const now = dayjs();
  const time = dayjs(timestamp);

  if (now.isSame(time, 'day')) {
    return `Today at ${time.format('h:mm A')}`;
  }
  if (now.subtract(1, 'day').isSame(time, 'day')) {
    return `Yesterday at ${time.format('h:mm A')}`;
  }
  return time.fromNow();
}

function Home() {

  useListenMessages()

  const selectedConversation = useConversation((state) => state.selectedConversation);
  const chaton = Boolean(selectedConversation);

  const {onlineUsers}=useSocketContext()
  const isOnline = onlineUsers.includes(selectedConversation?._id);

  const [message, setMessage] = useState('');

  const { loading: sendLoading, sendMessage } = useSendMessage();
  const { messages, loading: messagesLoading } = useGetMessages();

  const bottomRef = useRef(null);

  const storedUser = localStorage.getItem('chat-user');
  const loggedInUser = storedUser ? JSON.parse(storedUser) : null;
  const loggedInUserId = loggedInUser?.id;
  const loggedInUserPic = loggedInUser?.profilePicture;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await sendMessage(message);
    setMessage('');
  };

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const validMessages = messages.filter(
    (m) => m.message && m.message.trim() !== ''
  );

  console.log("onlineUsers:", onlineUsers);
console.log("selectedConversation:", selectedConversation);

  return (
    <div className="min-h-screen w-full bg-cover bg-center bg-no-repeat">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="flex flex-row w-full max-w-7xl h-[85vh] backdrop-blur-md rounded-lg shadow-lg text-white overflow-hidden">
          <div className="w-1/4 border-r border-white/20 h-full">
            <SideBar />
          </div>

          <div className="flex flex-col w-full h-full">
            {chaton ? (
              <>
                <div className="bg-gray-800/50 shadow-md p-2">
                  <h1 className="text-2xl">To {selectedConversation.name}</h1>
                  <h1 className='text-gray-500'>{isOnline?'online':'offline'}</h1>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messagesLoading ? (
                    <div className="animate-pulse space-y-4">
                      <div className="h-8 bg-gray-700 rounded w-1/2"></div>
                      <div className="h-8 bg-gray-700 rounded w-1/3"></div>
                      <div className="h-8 bg-gray-700 rounded w-1/3"></div>
                      <div className='flex flex-col items-end space-y-4'>
                        <div className="h-8 bg-gray-700 rounded w-2/3"></div>
                        <div className="h-8 bg-gray-700 rounded w-2/3"></div>
                      </div>
                     

                    </div>
                  ) : validMessages.length === 0  ? (
                    <div className="text-center text-gray-400">
                      <p>You have no previous messages with this user.</p>
                    </div>
                  ) : (
                    messages.map((msg, index) => {
                      const isSender = msg.senderId === loggedInUserId;
                      return (
                        <div
                          key={msg._id || `${msg.createdAt}-${index}`}
                          className={`chat ${isSender ? 'chat-end' : 'chat-start'}`}
                        >
                          <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                              <img
                                src={
                                  isSender
                                    ? loggedInUserPic
                                    : selectedConversation.profilePicture
                                }
                                alt="User avatar"
                              />
                            </div>
                          </div>

                          <div className="chat-header">
                            {isSender ? 'You' : selectedConversation.name}
                            <time className="text-xs opacity-50 ml-2">
                              {formatTimestamp(msg.createdAt)}
                            </time>
                          </div>

                          <div
                            style={{ padding: 7 }}
                            className="
                              rounded-xl 
                              p-4
                              bg-white
                              text-gray-900 
                              break-words 
                              whitespace-normal 
                              max-w-[14rem]
                              sm:max-w-[16rem]
                              md:max-w-[18rem]
                              lg:max-w-md
                            "
                          >
                            <h1>{msg.message}</h1>
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={bottomRef} />
                </div>

                <div className="p-4 mt-auto">
                <div className="p-4 mt-auto">
                      <form onSubmit={handleSubmit}>
                        <div className="flex items-center">
                          <textarea
                            placeholder="Type a message..."
                            style={{ textIndent: '12px'}}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault(); 
                                handleSubmit(e);    
                              }
                            }}
                            className="
                              flex-1 
                              
                              py-2 
                              px-2 
                              focus:ring-0 
                              focus:border-0 
                              outline-none 
                              bg-gray-800/50 
                              border 
                              border-gray-700 
                              rounded-l-md
                            "
                          />

                          <button
                            type="submit"
                            disabled={sendLoading}
                            className="
                              px-4 
                              h-12.5 
                              bg-secondary 
                              opacity-90 
                              hover:opacity-100 
                              text-white 
                              rounded-r-md
                            "
                          >
                            {sendLoading ? (
                              <div className='h-6 w-12'>
                                <span className="loading loading-dots w-8 h-3" />
                              </div>
                            ) : (
                              <FiSend className="w-12 h-6 cursor-pointer" />
                            )}
                          </button>
                        </div>
                      </form>
                    </div>

                </div>
              </>
            ) : (
              <div className="flex items-center justify-center flex-1 gap-5 flex-col">
                <h1 className="text-4xl text-rose-200 mb-2">
                  Search for someone to start chatting!
                </h1>
                <FaSearch className="text-[200px] mt-2 text-rose-900 opacity-40" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
