import React, { useEffect } from 'react'
import Home from './pages/Home/Home'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { ToastContainer, toast } from 'react-toastify';
const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("✅ Logged in");
        // agar user login hai aur /login par hai to home bhejo
        if (window.location.pathname === "/login") {
          navigate('/');
        }
      } else {
        console.log("❌ Logged out");
        navigate('/login');
      }
    });

    // cleanup listener jab component unmount hoga
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div>
      <ToastContainer  theme='dark'/>

      <Routes>
        <Route path='/' element = { <Home/>} />
        <Route path='/login' element = { <Login/>} />
        <Route path='/player/:id' element = {<Player/>}/>
      </Routes>
    </div>
  )
}

export default App;
