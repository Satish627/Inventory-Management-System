const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"]
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
        trim: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minLength: [6, "Password must be atleasr 6 character"],
        maxLength: [23, "Password is too long"]
    },
    photo: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        default: +45
    },
    bio: {
        type: String,
        maxLength: [250, "Too long bio"],
        default: "bio"
    }
},
    { timestamps: true }
)

const User = mongoose.model("User", userSchema)
module.exports =  User