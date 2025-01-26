const express = require('express');

const userRouter=express.Router()

const {signupUser,loginUser,deleteUser,getUser,updateUser}=require("../controllers/userController");
const isLoggedIn = require('../middleware/isLoggedIn');

userRouter.post("/signup",signupUser)
userRouter.post("/login",loginUser)
userRouter.delete("/delete/",isLoggedIn,deleteUser)
userRouter.post("/getUser/",isLoggedIn,getUser)
userRouter.patch("/update/",isLoggedIn,updateUser)


module.exports=userRouter