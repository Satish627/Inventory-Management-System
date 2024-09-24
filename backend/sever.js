const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express()

const PORT = process.env.PORT || 5001 ;

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



