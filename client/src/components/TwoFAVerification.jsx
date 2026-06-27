import React, { useState } from 'react'
import {verify2FA, reset2FA} from "../service/authApi"

const TwoFAVerification = ({onVerifySuccess, onResetSuccess}) => {
   
  const [otp, setOtp] = useState("")  
  const [error, setError] = useState("")

  const handleTokenVeification = async (e) =>{
    e.preventDefault()
    try {
      const {data} = await verify2FA(otp);
      onVerifySuccess(data)
    } catch (error) {
      setOtp("")
      console.log("OTP error ", error)
      setError(error)
        }
  }

  const handleReset = async () =>{
    try {
      const {data} = await reset2FA();
      onResetSuccess(data)
      
    } catch (error) {
      setOtp("")
      console.log("OTP error ", error)
      setError(error)
    }

  }


  return (
    <form
      onSubmit={handleTokenVeification}
      className="bg-blue-300 rounded-lg shadow-md w-full max-w-sm mx-auto text-black"
    >
      <div className="pt-6">
        <h2 className="text-4xl text-gray-800 text-center font-bold">
         Validate TOTP
        </h2>
      </div>
      <hr className="text-gray-800 mt-6 mb-6" />
      <p className="text-gray-800 text-center text-lg font-light mx-3">
       Please Enter 6-digit Time Based OTP to verifty 2FA Authentication 
      </p>
      <div className="p-6">
        <div className="mb-4">
          <label htmlFor="username" className="text-gray-700 text-sm">
            TOTP
          </label>
          <input
            label="TOTP"
            type="text"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
            }}
            className="w-full p-2 border rounded mt-2 mb-3"
            placeholder="Enter Your TOTP"
            required
          />
        
        {error && <p className="text-red-500 text-sm mb-3">{error.message}</p>}
        <button type='submit' className="w-full bg-blue-500 text-white py-2 rounded-md cursor-pointer mb-3">
          Verify TOTP
        </button>
        <button onClick={handleReset} type='button' className="w-full bg-slate-600 text-white py-2 rounded-md cursor-pointer">
          Reset 2FA
        </button>
        
      </div>
    </div>
    </form>
  )
}

export default TwoFAVerification
