"use client"
import { useState,useEffect } from 'react'
import  axios from "axios"
import Link from 'next/link'

const VerifyPage = () => {

  const  [token, setToken] = useState("")
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(false)

  const verifyEmail = async()=>{
    try {
      await  axios.post("/api/users/verify", {token})
      console.log("user")
    } catch (error:any) {
        console.log("ERROR", error.response.data)
    }
  }

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
  }, [])

  console.log(token)
  useEffect(() => {
    if(token.length > 0) {
      verifyEmail();
    }
}, [token]);

return(
  <div className="flex flex-col items-center justify-center min-h-screen py-2">

      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>

      {isVerified && (
          <div>
              <h2 className="text-2xl">Email Verified</h2>
              <Link href="/login">
                  Login
              </Link>
          </div>
      )}
      {error && (
          <div>
              <h2 className="text-2xl bg-red-500 text-black">Error</h2>
              
          </div>
      )}
  </div>
)
}

export default VerifyPage