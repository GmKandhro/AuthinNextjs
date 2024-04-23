import mongoose from "mongoose";

export const dbConf =async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        const connection =  mongoose.connection;

        connection.on('connected',()=>{
            console.log("MongoDB connected successfully")
        })

        connection.on('error',(err)=>{
            console.log("SomeThing went wrong with  MongoDB connection: ", err);
            process.exit();
        })
        
        console.log('mongodb connected successfull on host ', connection.host); 
    } catch (error) {
        console.log("Db connection fialed :", error)
    }
}