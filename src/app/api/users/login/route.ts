import {dbConf} from '@/dbConf/dbConf'
import User from '@/models/userModel'
import { NextResponse,NextRequest } from 'next/server'
import   bcryptjs from 'bcryptjs'
import  jwt from 'jsonwebtoken'


dbConf()

export async function  POST(request:NextRequest){
    try {
        const reqBody =await request.json()
        const {email,password} = reqBody;

        const user = await User.findOne({email})

        if(!email || !password){
            return NextResponse.json({error: "Plz fill all feilds"}, {status: 400})
        }
        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }



        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }

        //generate token for the user 

        const tokenData = {
            userId : user._id,
            email : user.email,
        }

        const token =  jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true,    
        })

        return response
    } catch (error : any) {
        return NextResponse.json({error : error.message , status:500})
    }
}