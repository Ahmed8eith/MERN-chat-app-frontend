import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useLogin from '../../hooks/useLogin';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const{loading,login}=useLogin()
  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(username,password)
  }

  return (
    <div>
      <div className="min-h-screen w-full bg-cover bg-center flex items-center justify-center">
        <div className="w-full grid gap-3 max-w-md backdrop-blur-sm p-8 rounded-lg shadow-lg text-white text-center">
          <header className="mb-8">
            <h2 className="text-3xl font-bold">Welcome back to chat</h2>
            <h2 className="text-2xl font-semibold">Please Log in to continue chatting</h2>
          </header>

          <form onSubmit={handleSubmit} className="text-left grid gap-2 px-4">
            <div className="space-y-4">
              <h1 className="text-2xl font-semibold">Username</h1>
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                required
                type="text"
                placeholder="Username"
                className="input w-full focus:outline-none bg-transparent text-black"
              />
            </div>

            <div className="grid">
              <h1 className="text-2xl font-semibold">Password</h1>
              <div className="relative">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="input w-full focus:outline-none bg-transparent text-black"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-950 hover:text-zinc-700"
                >
                  {showPassword ? (
                    <FaEyeSlash className="w-5 h-5" />
                  ) : (
                    <FaEye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button disabled={loading} type="submit" className="btn btn-secondary w-full mt-8">
              {loading? <span className="loading loading-infinity loading-sm"></span>:'Login'}
            </button>
          </form>

          <div className="flex items-center space-x-2 mt-8 justify-center">
            <h1>Have no account?</h1>
            <Link to="/register" className="link link-primary">
              create one now!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
