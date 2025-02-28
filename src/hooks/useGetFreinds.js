import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
const useGetFreinds = () => {
  const [loading, setLoading] = useState(false);
  const [freinds, setFreinds] = useState([]);

  useEffect(() => {
    const fetchFreinds = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/users/get-freinds", { withCredentials: true });
        const data = res.data; 
        setFreinds(data);
      } catch (error) {
        toast.error(error.message || 'Could not display freinds', {
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

    fetchFreinds();
  }, []);

  return { loading, freinds };
};

export default useGetFreinds;
