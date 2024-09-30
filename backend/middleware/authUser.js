const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")


const protectUser = async (req,res,next) => {
   try{
     // check if there is any token
     const token = req.cookies.token
     if(!token){
         res.status(402)
         throw new Error("User not authorized, Please login")
     }
     if(token){
             //check if the token has expired or not
         const verifyToken = jwt.verify(token, process.env.JWT_SECRET)
 
             //check if user exist
         const user = await User.findById(verifyToken.id).select("-password")
             //return user
         if(!user){
             res.send(401)
             throw new Error("User not found")
         }
         req.user = user
         next()
     }
   }
   catch(error){
    res.status(401)
         throw new Error("User not authorized, Please login")
   }
}

module.exports = protectUser