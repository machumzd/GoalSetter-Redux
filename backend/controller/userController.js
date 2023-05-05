const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const asyncHandler=require('express-async-handler')
const User=require('../model/userModel')


//@desc get user data
//@route Post /api/users/
const registerUser=asyncHandler(async(req,res)=>{
    const{name,email,password,phone}=req.body
    if(!name ||!email || !phone || !password){
        res.status(400)
        throw new Error('please add credintials')
    }
    const userExists=await User.findOne({phone:req.body.phone})
    if(userExists){
      res.status(400)
      throw new Error('user aldready exists')
    }
    //Hash Password

    const salt= await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)

    //create user
    const user= await User.create({
        name,email,phone,password:hashedPassword
    })
    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            phone:user.phone,
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }

    res.json({message:"user registered"})
})



//@desc login user
//@route POST /api/users/login
const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body

    const user=await User.findOne({email})
    if(user &&(await bcrypt.compare(password,user.password))){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            phone:user.phone ,
            token:generateToken(user._id)

        })
    }else{
        res.status(400)
        throw new Error("invalid credintials")
    }
    res.json({message:'Login User'})
})

//@desc get user data
//@route GET /api/users/me
const getMe=asyncHandler(async(req,res)=>{
    res.status(200).json(req.user)
    res.json({message:'User data display'})
})



//Generate token
const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'4d'
    })
}
module.exports={
 registerUser ,
 loginUser,
 getMe
}