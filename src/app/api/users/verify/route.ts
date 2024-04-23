import {dbConf} from '@/dbConf/dbConf'
import User from '@/models/userModel'
import { NextResponse,NextRequest } from 'next/server'


export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {token} = reqBody
        console.log(token)
       const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});
       console.log(user)

       if (!user) {
        return NextResponse.json({error : "token not verified" , status:400})
       }

       user.isVerfied = true;
       user.verifyToken = undefined;
       user.verifyTokenExpiry = undefined;

       await user.save()

       return NextResponse.json({
        message: "Email verified successfully",
        success: true
    })  
    } catch (error : any) {
        return NextResponse.json({error : error.message , status:500})
    }
}


dbConf()




// mongodb+srv://gmkandhro88:gm@cluster0.8bmrufp.mongodb.net/auth