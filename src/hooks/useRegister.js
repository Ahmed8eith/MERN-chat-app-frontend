import axios from 'axios'
import { useState } from 'react'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/authContext'

const useRegister = () => {
  const [loading, setLoading] = useState(false)
  const { setAuthUser } = useAuthContext()
  const API_URI = import.meta.env.VITE_API_URI;

  const navigate = useNavigate()

  const register = async ({ name, username, password, confirmPassword, gender }) => {
    const success = handleInputErrors({ name, username, password, confirmPassword, gender })
    if (!success) return

    setLoading(true)
    try {
      const res = await axios.post(
        `${API_URI}/api/auth/register`,
        { name, username, password, confirmPassword, gender },
        { withCredentials: true }
      )
      const data = res.data
      if (data.error) {
        throw new Error(data.error)
      }

      localStorage.setItem('chat-user', JSON.stringify(data))
      setAuthUser(data)
      toast.success('Account created successfully', {
        duration: 3000,
        style: {
          background: '#D1FAE5',
          color: '#047857',
          border: '1px solid #34D399',
          borderRadius: '8px'
        }
      })
      // Optionally, navigate to the homepage:
      navigate("/")
    } catch (error) {
      const message = error.response?.data?.error || error.message
      toast.error(message, {
        duration: 3000,
        style: {
          background: '#FFE4E4',
          color: '#DC2626',
          border: '1px solid #FCA5A5',
          borderRadius: '8px'
        }
      })
    } finally {
      setLoading(false)
    }
  }

  return { loading, register }
}

export default useRegister

function handleInputErrors({ name, username, password, confirmPassword, gender }) {
  if (!name || !username || !password || !confirmPassword || !gender) {
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
  if (password !== confirmPassword) {
    toast.error('Passwords do not match', {
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

  if (password.length < 6) {
    toast.error('Password must be at least 6 characters long', {
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
