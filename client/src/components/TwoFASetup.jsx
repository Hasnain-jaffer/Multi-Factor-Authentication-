import React, { useEffect, useState } from 'react'
import Setup2FA from '../pages/Setup2FA'
import { setup2FA } from '../service/authApi'

const TwoFASetup = ({onSetupComplete}) => {

  const [message, setMessage] = useState("")
  const [response, setResponse] = useState({})

   const fetchQRCode = async () => {
    const {data} = await setup2FA();
    console.log(response)
    setResponse(data)

  };

   useEffect(() => {
   fetchQRCode()
   }, [])
   
   
  const copyClipBoard = async () =>{
    await navigator.clipboard.writeText(response.secret);
    setMessage("Secret Copied to the Clipboard")
  }
  

  return (
     <div
      className="bg-blue-300 rounded-lg shadow-md w-full max-w-sm mx-auto text-black"
    >
      <div className="pt-6">
        <h2 className="text-4xl text-gray-800 text-center font-bold">
          Turn on 2FA Verification
        </h2>
      </div>
      <hr className="border-gray-800 mt-6 mb-6" />
      <p className="text-gray-800 text-center text-lg font-light pr-6 pl-6">
        Scan the QR Code below with Authenticator App
      </p>
      <div className='p-6'>
        <div className='flex justify-center'>
          {response.qrcode ? <img src={response.qrcode} alt="2FA QR Code" className='mb-4 border rounded-md'/> : ("")}
        </div>
        <div className='flex items-center mt-3 mb-3'>
      <hr className="flex-1 border-gray-800 mt-6 mb-6" />
      <div className='text-gray-600 text-sm font-light m-auto'>Enter the QR code manually</div>
      <hr className="flex-1 border-gray-800 mt-6 mb-6" />
        </div>
        <div className='mb-6'>
          {message && <p className='text-green-600 text-sm mb-3'>{message}</p>}
        <input readOnly defaultValue="" value={response.secret} className='w-full border rounded text-xs text-gray-600 p-4' onClick={copyClipBoard} />
      </div>
      <button onClick={onSetupComplete} className='w-full bg-blue-500 text-white py-2 rounded-md'>Continue To Verify</button>
      </div>
    </div>
  )
}

export default TwoFASetup
