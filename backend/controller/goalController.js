const asyncHandler=require('express-async-handler')
const Goal=require('../model/goalModel')
const getGoals=asyncHandler(async(req,res)=>{
    const goals=await Goal.find()
  
        res.json(goals)
   
})

const setGoals=asyncHandler(async(req,res)=>{

   if(!req.body.text){
     res.status(400)
     throw new Error("please add a text")
   }
   const goal=await Goal.create({
    text:req.body.text
    
})
res.status(200).json(goal)
})



const deleteGoals=asyncHandler(async(req,res)=>{
    const goal=await Goal.findById(req.params.id)
    if(!goal){
        res.send(400)
        throw new Error("goal not found")
    }
    const deleteGoal=await Goal.findByIdAndDelete(req.params.id)
    res.status(200).json({message:` Goal Deleted ${req.params.id}` })
})
const updateGoals=asyncHandler(async(req,res)=>{
    const goal= await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error("goal not found")
    }
    const updateGoal=await Goal.findByIdAndUpdate(req.params.id,req.body,{new:true})

    res.status(200).json({message:` Goals updated ${req.params.id}`})
})

module.exports ={
    getGoals,
    deleteGoals,
    setGoals,
    updateGoals 
}