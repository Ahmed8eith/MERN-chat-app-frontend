import { useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  const fetchConversations = async (search) => {
    if (!search) {
      setConversations([]);
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(
        `/api/users?search=${encodeURIComponent(search)}`,
        { withCredentials: true }
      );
      const data = res.data;
      if (data.error) {
        throw new Error(data.error);
      }
      setConversations(data);
    } catch (error) {
      toast.error(error.message || 'Could not get users', {
        duration: 3000,
        style: {
          background: '#FFE4E4',
          color: '#DC2626',
          border: '1px solid #FCA5A5',
          borderRadius: '8px'
        }
      });
    } finally {
      setLoading(false);
    }
  };

  return { loading, conversations, fetchConversations };
};

export default useGetConversations;
