import dotenv from 'dotenv'
import express from "express"
import connectDB from './db.js'
import batterRouter from "./route.js"
dotenv.config({})

const app=express()


app.use(express.json())
app.get("/",(req,res)=>{
    res.send("Hello from BMs")
})
app.use('/api', batterRouter)
app.listen(process.env.PORT,()=>{
    connectDB()
    console.log(`Server stateed at port ${process.env.PORT}`)
})