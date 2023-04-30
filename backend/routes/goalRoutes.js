const express =require("express")
const router=express.Router()
const {getGoals,deleteGoals,setGoals,updateGoals}= require('../controller/goalController')


router.route('/').get(getGoals).post(setGoals)
router.route('/:id').put(updateGoals).delete(deleteGoals)
module.exports=router