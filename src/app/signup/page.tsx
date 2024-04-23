"use client"
import React from 'react'
import { useState , useEffect } from 'react'
import  axios from "axios"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


const SignupPage = () => {
  const route = useRouter()
  const [user, setUser] = useState({
    username: "",
    email:"",
    password:"",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(false)

  const Signup =async (e:any)=>{
    e.preventDefault();
      try {
        setIsLoading(true)
        const response = await  axios.post("/api/users/signup", user);
        route.push('/login')
      } catch (error:any) {
        console.log(error.response);
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
    if (!user.username || !user.password || !user.email){ 
      setButtonDisabled(true)
    }else{
      setButtonDisabled(false)
    }
  }, [user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <h1>{isLoading ? "Processing" : "Signup"}</h1>
    <hr />
    <ToastContainer />
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={Signup}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
        </div>
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
            Sign Up
          </button>
        <Link href="/login">Visit login page</Link>
        </div>
      </form>
    </div>
  )
}

export default SignupPage
