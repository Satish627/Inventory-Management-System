
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from "express";
import bodyParser from 'body-parser';
import cors from "cors";
import userRoute from "./routes/userRoute.js"

dotenv.config();


const app = express()

const PORT = process.env.PORT || 5001 ;

//middlewares
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({extended:false}))

// connect to mongodb and start server
mongoose
    .connect(process.env.MONGODB_URL)
    .then(()=>{
    app.listen(PORT ,()=> {
        console.log("Db connected successfully")
        console.log(`Listening to port ${PORT}`) 
    })
    })
    .catch((error)=>{
        console.error('Error connecting to mongodb', error)
    })

app.get("/",(req,res)=>{
    res.send("Home page")
})
//Routes middleware
app.use("/api/users", userRoute)


