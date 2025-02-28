import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/home/home';
import Register from './pages/register/register';
import Login from './pages/login/login';
import { Toaster } from 'sonner';
import { useAuthContext } from './context/authContext';


function App() {

  const {authUser}=useAuthContext()

  return (
    
    <div>
     
       <Toaster 
    position="top-left"
    expand={true}
    richColorss
    theme="light"
    style={{ opacity: 1 }}
  />
        <Routes>
          <Route element={authUser? <Home/>:<Navigate to={'/login'}/>} path="/"/>
          <Route element={authUser? <Navigate to='/'/>:<Register/>} path="/register"/>
          <Route element={authUser? <Navigate to='/'/>:<Login/>} path="/login"/>
        </Routes>    
  </div>
  
    
  )
}

export default App
