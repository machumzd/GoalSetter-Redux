const mongoose=require('mongoose')

const connectDB =async() =>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URL)
        console.log('\x1b[34m%s\x1b[0m',`mongodb connected ${conn.connection.host}`, "\x1b[0m")
    }catch(error){
        console.log("this is "+error)
        process.exit(1)
    }
}
module.exports =connectDB