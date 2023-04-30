const express=require("express")
const {errorHandler}=require('./backend/middleware/errorMiddleware')
const dotenv=require("dotenv").config()
const port=process.env.PORT || 8000

const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/api/goals',require('./backend/routes/goalRoutes'))
app.use(errorHandler)

app.listen(port,()=>console.log(`server started on port ${port}`))