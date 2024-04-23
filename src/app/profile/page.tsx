"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';


const ProfilePage = () => {
  const [data, setData] = useState("nothing")
  const route = useRouter()
  const getData = async()=>{
      try {
        const res = await  axios.get("/api/users/me")
        console.log(res.data.data)
        setData(res.data.data._id)
       
        console.log(typeof data)
      } catch (error:any) {
        console.log(error)
        toast(error.response.data.error,{type:'error'})
      }
  }

  const logout = async()=>{
    try {
      const res = await  axios.post("/api/users/logout")
      route.push('/login')

    } catch (error:any) {
      console.log(error)
      toast(error.response.data.error,{type:'error'})
    }
  }
  useEffect(() => {
    getData()
  }, [data])
console.log("Data",data)
  return (
   <>
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <h2 className="p-1 rounded bg-green-500">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}
            </Link>}</h2>
        <hr />
        <button
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >Logout</button>

        


            </div>
   </>
  )
}

export default ProfilePage