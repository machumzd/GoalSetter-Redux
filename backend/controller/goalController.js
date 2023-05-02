const asyncHandler = require('express-async-handler')
const Goal = require('../model/goalModel')
const User = require('../model/userModel')

const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id })

    res.json(goals)

})

const setGoals = asyncHandler(async (req, res) => {

    if (!req.body.text) {
        res.status(400)
        throw new Error("please add a text")
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id

    })
    res.status(200).json(goal)
})



const deleteGoals = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.send(400)
        throw new Error("goal not found")
    }
    const deleteGoal = await Goal.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: ` Goal Deleted ${req.params.id}` })
})

const updateGoals = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error("goal not found")
    }
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('user not found')
    }
    //make sure the loggedin user matches the goal user
    if (goal.user.toString() != user.id) {
        res.status(401)
        throw new Error('user not authorized')
    }

    const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatedGoal)
})

module.exports = {
    getGoals,
    deleteGoals,
    setGoals,
    updateGoals
}