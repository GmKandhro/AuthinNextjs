import {dbConf} from '@/dbConf/dbConf'
import User from '@/models/userModel'
import { NextResponse,NextRequest } from 'next/server'
import   bcryptjs from 'bcryptjs'
import  jwt from 'jsonwebtoken'
import {getDataFromToken} from "@/helper/getDataFromToken"

dbConf()

export async function  GET(request:NextRequest){
    try {
       const userId =await  getDataFromToken(request)
        
       
       const userData = await User.findById(userId).select('-password')
        if(!userData ){
            return NextResponse.json({error : "user not found"})
        }
       return NextResponse.json({message:"user found",data : userData})
       
    }  catch (error : any) {
        return NextResponse.json({error : error.message , status:500})
    }
}