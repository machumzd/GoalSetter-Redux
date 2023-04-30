const asyncHandler=require('express-async-handler')

const getGoals=asyncHandler(async(req,res)=>{
    res.json({message:'get goals'})
})

const setGoals=asyncHandler(async(req,res)=>{

   if(!req.body.text){
     res.status(400)
     throw new Error("please add a text")
   }
    res.json({message:"post goals"})
})
const deleteGoals=asyncHandler(async(req,res)=>{
    res.status(200).json({message:`Delete Goals ${req.params.id}` })
})
const updateGoals=asyncHandler(async(req,res)=>{
    res.status(200).json({message:`updated Goals ${req.params.id}`})
})

module.exports ={
    getGoals,
    deleteGoals,
    setGoals,
    updateGoals 
}