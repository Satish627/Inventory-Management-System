const dotenv = require("dotenv").config()
const mongoose = require("mongoose")
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const errorHandler = require("./middleware/errorHandler.js")

const userRoute = require("./routes/userRoute.js") 

const app = express()

const PORT = process.env.PORT || 5001 ;

//middlewares
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({extended:false}))

//Error handler middleware
app.use(errorHandler)
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


