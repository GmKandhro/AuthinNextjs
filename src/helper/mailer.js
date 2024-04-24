import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import   bcryptjs from 'bcryptjs'


export const SendMail = async({email,emailType,userId})=>{
    try {
      
      const hashedToken = await bcryptjs.hash(userId.toString(),10)
      if (emailType === "VERIFY") {
        await User.findByIdAndUpdate(
          userId, 
          { $set: { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 } },
          { new: true }
      );
    } else if (emailType === "RESET"){
      let user = await User.findByIdAndUpdate(
        userId, 
        { $set: { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 } },
        { new: true }
    );
    }


      const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "cd5f86f7005fe8",
          pass: "d71bb3c34a5148"
        }
      });

          const mailerInfo = {
            from: "gmkandhro88@gmail.com",  
            to: email,
            subject: emailType === "VERIFY" ?  `Email Verification Code For Your Account`: `Password Reset Link`,
            html: `<p>Click <a href="${process.env.DOMAIN}/verify?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`

          }

          const  info = await transport.sendMail(mailerInfo)

          return info

    } catch (error) {
        console.log('Something went wrong while sending mail : ', error)
    }
}