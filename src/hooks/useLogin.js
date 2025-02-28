import { useState } from "react"
import { toast } from "sonner"
import axios from "axios"
import { useAuthContext } from "../context/authContext"

const useLogin = () => {
    const {setAuthUser}=useAuthContext()

    const [loading,setLoading]=useState(false)

    const login=async(username,password)=>{
        const success = handleInputErrors(username, password)
    if (!success) return
    setLoading(true)
        try {

            const res=await axios.post('/api/auth/login',{username,password},{withCredentials:true})

            const data =await res.data
            if(data.error){
                throw new Error(data.error)
            }

            localStorage.setItem('chat-user',JSON.stringify(data))
            setAuthUser(data)
          } catch (error) {
            const errorMessage =
              error.response?.data?.error || error.message || 'Something went wrong';
            toast.error(errorMessage, {
              duration: 3000,
              style: {
                background: '#FFE4E4',
                color: '#DC2626',
                border: '1px solid #FCA5A5',
                borderRadius: '8px',
              },
            });
        } finally{
            setLoading(false)
        }
    } 
    
    return {loading,login}
}

export default useLogin


function handleInputErrors(username, password) {
    if (!username || !password) {
      toast.error('Please fill in all the fields', {
        duration: 3000,
        style: {
          background: '#FFE4E4',
          color: '#DC2626',
          border: '1px solid #FCA5A5',
          borderRadius: '8px'
        }
      })
      return false
    }
  
    return true
  }
  