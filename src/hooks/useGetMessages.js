import React, { useEffect } from 'react'
import { useState } from 'react'
import useConversation from '../context/useConversation'
import { toast } from 'sonner'
import axios from 'axios'

const useGetMessages = () => {
  const [loading,setLoading]=useState(false)
  const {messages,setMessages,selectedConversation}=useConversation()
  const API_URI = import.meta.env.VITE_API_URI;


  useEffect(()=>{
    const getMessages=async()=>{
        setLoading(true)
        try {
            const res=await axios.get(`${API_URI}/api/message/${selectedConversation._id}`,{withCredentials:true})
            const data=await res.data
            if(data.error){
                throw new Error(data.error)
            }
            setMessages(data)

            setMessages(data)
        } catch (error) {
            toast.error(error.message || 'Could not fetch messages', {
                duration: 3000,
                style: {
                  background: '#FFE4E4',
                  color: '#DC2626',
                  border: '1px solid #FCA5A5',
                  borderRadius: '8px'
                }
              });
        } finally{
            setLoading(false)
        }
    }

    if(selectedConversation?._id){
        getMessages()
    }
  },[selectedConversation?._id,setMessages])
  return {messages,loading}
}

export default useGetMessages
