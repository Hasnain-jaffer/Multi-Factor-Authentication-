import React from 'react'
import { useNavigate } from 'react-router-dom' 
import {useSession} from "../context/SessionContext"
import { logoutUser } from '../service/authApi'

const HomePage = () => {
  const navigate = useNavigate()
  const {user, logout} = useSession()
   
  const handleLogout = async()=>{
     try {
        const {data} = await logoutUser();
        logout(data)
        navigate("/login")
     } catch (error) {
      console.log("logout error ",error)
      
     }
  }

  return (
    <div className='p-6 bg-white text-black rounded-lg shadow-md max-w-md mx-auto mt-10'>
       <h2 className='text-xl font-semibold mb-4'>Welcome, {user.username}!</h2>
       <p>You Have Successfully Login and Verified Your 2FA</p>
       <button onClick={handleLogout} className='cursor-pointer mt-4 bg-red-500 text-white px-4 py-2 rounded'>Logout</button>
    </div>
  )
}

export default HomePage
