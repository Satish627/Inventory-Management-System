const express = require("express") 

const {registerUser, loginUser, logout, getUser, loggedinStatus,updateUser} = require("../controllers/userController.js")
const protectUser = require("../middleware/authUser.js")


const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/logout", logout)
router.get("/getuser",protectUser, getUser)
router.get("/loggedinStatus", loggedinStatus)
router.patch("/updateuser",protectUser, updateUser)


module.exports = router