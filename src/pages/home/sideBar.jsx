import React, { useState } from 'react'; 
import { toast } from 'sonner';
import { TbLogout2 } from "react-icons/tb";
import axios from 'axios';
import SearchBar from './searchBar';
import { useAuthContext } from '../../context/authContext';
import useGetConversations from '../../hooks/useGetConversations';
import useConversation from '../../context/useConversation';
import useGetFreinds from '../../hooks/useGetFreinds';

function SideBar() {
  const [searchUsers, setSearchUsers] = useState('');
  
  // Hook for search results
  const { loading, conversations, fetchConversations } = useGetConversations();
  // Hook for fetching friends (users you have conversations with)
  const { loading: friendsLoading, freinds } = useGetFreinds();
  
  const { setAuthUser } = useAuthContext();
  const setSelectedConversation = useConversation(state => state.setSelectedConversation);
  
  const handleLogout = async () => {
    try {
      await axios.post(
        'http://localhost:5000/api/auth/logout',
        {},
        { withCredentials: true }
      );
      localStorage.removeItem('chat-user');
      setAuthUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error.message || 'Something went wrong', {
        duration: 3000,
        style: {
          background: '#FFE4E4',
          color: '#DC2626',
          border: '1px solid #FCA5A5',
          borderRadius: '8px'
        }
      });
    }
  };

  const handleSelectConversation = (user) => {
    setSelectedConversation({
      _id: user._id,
      name: user.name,
      username: user.username,
      profilePicture: user.profilePicture
    });
  };

  const handleSearchSubmit = (searchValue) => {
    setSearchUsers(searchValue);
    fetchConversations(searchValue);
  };

  // If there's a search term, display search results; otherwise, display friends.
  const usersToDisplay = searchUsers.trim() ? conversations : freinds;
  const isLoading = searchUsers.trim() ? loading : friendsLoading;


  
  return (
    <div className="flex flex-col h-full">
      {/* Top section with search */}
      <div>
        <SearchBar onSearchSubmit={handleSearchSubmit} />
      </div>

      {/* Display search results or friends */}
      <div className="p-4">
        {isLoading ? (
            <span className="loading loading-spinner text-secondary" style={{ display: 'inline-block',width:'30%' }}></span>
        ) : usersToDisplay.length === 0 ? (
          <p className="text-center text-gray-400">No conversations yet</p>
        ) : (
          usersToDisplay.map((user) => (
            <div 
              key={user._id}
              onClick={() => handleSelectConversation(user)}
              className="group flex items-center space-x-4 p-2 hover:bg-white transition-colors duration-300 cursor-pointer"
            >
              <img 
                src={user.profilePicture} 
                alt={user.name} 
                className="w-10 h-10 rounded-full object-cover" 
              />
              <div>
                <p className="font-medium text-white transition-colors duration-300 group-hover:text-gray-500">
                  {user.name}
                </p>
                <p className="text-sm text-gray-500">@{user.username}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Spacer */}
      <div className="flex-grow"></div>

      {/* Bottom section with logout */}
      <div className="p-4">
        <button 
          onClick={handleLogout} 
          className="btn btn-secondary h-12.5 w-full sm:w-1/2 flex items-center justify-center"
        >
          <TbLogout2 className="text-2xl mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default SideBar;
