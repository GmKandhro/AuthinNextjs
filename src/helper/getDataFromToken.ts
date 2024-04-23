import { NextResponse , NextRequest } from "next/server";
import jwt from 'jsonwebtoken'


export function getDataFromToken(request:NextRequest) {
    try {
       const token = request.cookies.get('token')?.value || ""
       if(!token ){
        return NextResponse.json({error : "user not found"})
    }
       const decodedToken :any = jwt.verify(token , process.env.TOKEN_SECRET!)
        return  decodedToken.userId
    } catch (error: any) {
        throw new Error(error.message);
    }
}