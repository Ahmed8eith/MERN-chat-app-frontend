import React from 'react'
import useConversation from '../context/useConversation'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'sonner'

const useSendMessage = () => {
    const [loading,setLoading]=useState(false)
    const {messages,setMessages,selectedConversation}=useConversation()

    const sendMessage=async (message)=>{
        setLoading(true)
        try {
            const res=await axios.post(`/api/message/send/${selectedConversation._id}`,{message,conversationId:selectedConversation.id},{withCredentials:true})
            const data=await res.data
            if(data.error){
                throw new Error(data.error)
            }

            setMessages([...messages,data])
        } catch (error) {
            toast.error(error.message || 'Could not send message', {
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
    return {sendMessage,loading}
}

export default useSendMessage
