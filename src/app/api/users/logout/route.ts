import {dbConf} from '@/dbConf/dbConf'
import { NextResponse,NextRequest } from 'next/server'



dbConf()

export async function  POST(request:NextRequest){
    try {
        const response = NextResponse.json({
            message:"user logout successfull",
            success:true,
        })
      
        response.cookies.set("token","", {
            httpOnly: true,    
        })

        return response
    } catch (error : any) {
        return NextResponse.json({error : error.message , status:500})
    }
}