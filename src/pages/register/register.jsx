import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye ,FaEyeSlash   } from "react-icons/fa";
import useRegister from '../../hooks/useRegister';


function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [form,setForm]=useState({
    name:'',
    username:'',
    password:'',
    confirmPassword:'',
    gender:''
  })

  const {loading,register}=useRegister()


  const handleSubmit=async(e)=>{
    e.preventDefault()
    console.log(form)

    await register(form)
  }

  return (
    <div>
      
      <div className="flex items-center justify-center min-h-screen bg-cover bg-center px-4 py-6 sm:px-6 md:px-8">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-md lg:max-w-2xl mx-auto backdrop-blur-sm p-4 sm:p-6 md:p-6 lg:p-12 rounded-lg shadow-lg text-white">
          <header className="mb-6 sm:mb-8 md:mb-8 lg:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Welcome to Chat</h2>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">Please create an account to start chatting</h2>
          </header>
  
          <form onSubmit={handleSubmit} className="flex flex-col gap-1">
            <div className="flex flex-col gap-2 sm:gap-3 md:gap-1">
              <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">Name</h1>
              <input 
                value={form.name}
                onChange={(e) => setForm({...form, name: e.target.value})}
                required 
                type="text" 
                placeholder="Name"
                className="input focus:outline-none w-full bg-transparent text-black text-sm sm:text-base" 
              />
            </div>
  
            <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
              <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">Username</h1>
              <input 
                value={form.username}
                onChange={(e) => setForm({...form, username: e.target.value})}
                required 
                type="text" 
                placeholder="Username"
                className="input focus:outline-none w-full bg-transparent text-black text-sm sm:text-base" 
              />
            </div>
  
            <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
              <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">Password</h1>
              <div className="relative">
                <input 
                  value={form.password}
                  onChange={(e) => setForm({...form, password: e.target.value})}
                  required 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Password"
                  className="input focus:outline-none w-full bg-transparent text-black text-sm sm:text-base" 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
                >
                  {showPassword ? 
                    <FaEyeSlash size={20} className="opacity-100 cursor-pointer text-zinc-950"/> : 
                    <FaEye size={20} className="opacity-100 cursor-pointer text-zinc-950"/>
                  }
                </button>
              </div>
            </div>
  
            <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
              <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">Confirm Password</h1>
              <div className="relative">
                <input 
                  value={form.confirmPassword}
                  onChange={(e) => setForm({...form, confirmPassword: e.target.value})}
                  required 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Confirm Password"
                  className="input focus:outline-none w-full bg-transparent text-black text-sm sm:text-base" 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
                >
                  {showPassword ? 
                    <FaEyeSlash size={20} className="opacity-100 cursor-pointer text-zinc-950"/> : 
                    <FaEye size={20} className="opacity-100 cursor-pointer text-zinc-950"/>
                  }
                </button>
              </div>
            </div>
  
            <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
              <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">Gender</h1>
              <div className="flex gap-6 sm:gap-8 md:gap-12">
                <label className="flex items-center gap-2 sm:gap-3 cursor-pointer">
                  <input 
                    required 
                    type="radio"
                    name="gender"
                    value="male"
                    checked={form.gender === 'male'}
                    onChange={(e) => setForm({...form, gender: e.target.value})}
                    className="radio radio-secondary" 
                  />
                  <span className="text-sm sm:text-base md:text-lg">Male</span>
                </label>
                <label className="flex items-center gap-2 sm:gap-3 cursor-pointer">
                  <input 
                    required 
                    type="radio"
                    name="gender"
                    value="female"
                    checked={form.gender === 'female'}
                    onChange={(e) => setForm({...form, gender: e.target.value})}
                    className="radio radio-secondary" 
                  />
                  <span className="text-sm sm:text-base md:text-lg">Female</span>
                </label>
              </div>
            </div>
  
            <button disabled={loading} type="submit" className="btn btn-secondary w-full mt-6 sm:mt-8">
            {loading? <span className="loading loading-infinity loading-sm"></span>:'Create account!'}
            </button>
          </form>
  
          <div className="flex items-center gap-2 mt-4 sm:mt-6 md:mt-8 text-xs sm:text-sm md:text-base">
            <h1 >Already have an account?</h1>
            <Link to="/login" className="link link-primary">Log in instead</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register