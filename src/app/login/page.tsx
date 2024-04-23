"use client"
import React from 'react'
import { useState , useEffect } from 'react'
import  axios from "axios"
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link'
const LoginPage = () => {
  const route = useRouter()
  const [user, setUser] = useState({
    email:"",
    password:"",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(false)

  const Signup =async (e:any)=>{
    e.preventDefault();
      try {
        setIsLoading(true)
        const response = await  axios.post("/api/users/login", user);
        route.push('/profile')
      } catch (error:any) {
        console.log(error.response.data.error);
        toast(error.response.data.error,{type:'error'})
      }
  }

  const handleChange = (e:any) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    if ( !user.password || !user.email){ 
      setButtonDisabled(true)
    }else{
      setButtonDisabled(false)
    }
  }, [user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <h1>{isLoading ? "Processing" : "Login"}</h1>
    <ToastContainer />
    <hr />
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={Signup}>
       
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-start justify-between ">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>
        <Link href="/signup">Create a new account</Link>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
