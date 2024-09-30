const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" })
}

//Register user
const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body

    //Validation
    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please fill in all the required fields")
    }
    if (password.length < 6) {
        res.status(400)
        throw new Error("Password needs to be longer")
    }
    //Check if user exist
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error("Email is already registered")
    }

    //Creating user
    const user = await User.create({
        name, email, password
    })

    //Generate jwt token
    const token = generateToken(user._id)

    //Send Http-only cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), //1 day
        sameSite: "none",
        // secure: true
    })

    if (user) {
        const { _id, name, email, photo, phone, bio } = user
        res.status(201).json({
            _id, name, email, photo, phone, bio, token
        })
    }
    else {
        res.status(400)
        throw new Error("Invalid user data")
    }
})

//Login user
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    //Validation
    if (!email || !password) {
        res.status(400)
        throw new Error("Please fill in email and password")
    }
    //Check if user exist
    const user = await User.findOne({ email })
    if (!user) {
        res.status(400)
        throw new Error("Email doesnot exist. Please signup first")
    }
    const passwordIsCorrect = await bcrypt.compare(password, user.password)
     //Generate jwt token
     const token = generateToken(user._id)

     //Send Http-only cookie
     res.cookie("token", token, {
         path: "/",
         httpOnly: true,
         expires: new Date(Date.now() + 1000 * 86400), //1 day
         sameSite: "none",
         // secure: true
     })
 
   
    if (user && passwordIsCorrect) {
        const { _id, name, email, photo, phone, bio } = user
        res.status(200).json({
            _id, name, email, photo, phone, bio,token
        })
        
    }
    else{
        res.status(201);
            throw new Error("Invalid email or password")
        }
    }

)   
const logout = asyncHandler( async (req, res)=>{
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0), //1 day
        sameSite: "none",
        // secure: true
    })
    return res.status(200).json("User successfully logout")
})
const getUser = asyncHandler( async (req, res)=>{
    const user = await User.findById(req.user._id)
    if (user) {
        const { _id, name, email, photo, phone, bio } = user
        res.status(200).json({
            _id, name, email, photo, phone, bio
        })
    }
    else {
        res.status(400)
        throw new Error("User not found")
    }})

    const loggedinStatus = asyncHandler(
        async(req,res)=> {
            const token = req.cookies.token

            if(!token){
                return res.json(false)
            }
            const verifyToken = jwt.verify(token, process.env.JWT_SECRET)
            if(verifyToken){
                return res.json(true)
            }
            res.json(false)
        }
    )

module.exports = { registerUser, loginUser, logout,getUser, loggedinStatus }

