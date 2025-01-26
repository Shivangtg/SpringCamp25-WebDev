const task=require("../models/taskModel");
const user=require("../models/userModel");
const bcryptjs = require('bcryptjs');
const jwt=require("jsonwebtoken");

const signupUser=async function(req,res){
    try {       
        if(!req.body.username||!req.body.password||!req.body.useremail){
            console.log("Please provide username,password and email");
            res.status(400).json({success:false,error:"Please provide username,password and email"});
            return ;
        }
        const isPresent=await user.findOne({$or:[{username:req.body.username},{useremail:req.body.useremail}]})
        if(isPresent){
            console.log("user already present");
            res.status(400).json({success:false,error:"username or useremail already present"});
            return ;
        }
        const bodyToPass=req.body
        const hashedPassword=await bcryptjs.hash(req.body.password,10);
        bodyToPass.password=hashedPassword;
        const newUser=new user(bodyToPass);
        await newUser.save();
        console.log("New user created");
        const token=jwt.sign({_id:newUser._id},process.env.SECRET_KEY,{expiresIn:"2d"});
        res.json({success:true,message:"New user created",token});
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,error});
    }
}

const loginUser=async function(req,res){
    try {
        if(!req.body.username||!req.body.password){
            console.log("Please provide username and password");
            res.status(400).json({success:false,error:"Please provide username and password"});
            return ;
        }
        const isPresent=await user.findOne({username:req.body.username});
        if(!isPresent){
            console.log("No such user present");
            res.status(400).json({success:false,error:"No such user present"});
            return ;
        }
        const isPasswordCorrect=await bcryptjs.compare(req.body.password,isPresent.password);
        if(isPasswordCorrect){
            console.log("found the user");
            const token=jwt.sign({_id:isPresent._id},process.env.SECRET_KEY,{expiresIn:"2d"});
            res.json({success:true,message:"found the user",token});
            return ;
        }
        console.log("wrong password");
        res.status(400).json({success:false,error:"wrong password"});
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,error});
    }
}

const deleteUser=async function(req,res){
    if(!req.body.user_id){
        console.log("Please provide user id to delete the user");
        res.status(400).json({success:false,message:"Please provide user id to delete the user"});
        return ;
    }
    try {
        const deletedUser=await user.findByIdAndDelete(req.body.user_id);
        const tasks=await task.find({user:req.body.user_id})
        tasks.forEach(task=>{
            task.deleteOne()
        })
        if(deleteUser){
            console.log("User deleted successfully");
            res.json({success:true,message:"User deleted successfully",deletedUser});
            return ;
        }
        console.log("cann't delete user");
        res.json({success:false,error:"cann't delete user"})
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,error});
    }
}

const getUser=async function(req,res){
    try {
        const demandedUser=await user.findOne({_id:req.body.user_id});
        console.log("retreived the user")
        res.json({success:true,demandedUser})
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false ,error})
    }
}

const updateUser=async function(req,res){
    if(!req.body.user_id){
        console.log("Please provide user id to delete the user");
        res.status(400).json({success:false,message:"Please provide user id to delete the user"});
        return ;
    }
    try {
        if(req.body.password){
            const hashedPassword=await bcryptjs.hash(req.body.password,10);
            req.body.password=hashedPassword;
        }
        const isPresent=await user.findOne({$or:[{username:req.body.username},{useremail:req.body.useremail}]});
        if(isPresent){
            console.log("this username or email or both cann't be used as they are already in use on the system");
            res.status(400).json({success:false,error:"this username or email or both cann't be used as they are already in use on the system"});
            return ;
        }
        const updatedUser=await user.findByIdAndUpdate(req.body.user_id,req.body,{new:true});
        if(updatedUser){
            console.log("User updated successfully");
            res.json({success:true,message:"User updated successfully",oldUser:isPresent,updatedUser});
            return ;
        }
        console.log("cann't update user");
        res.json({success:false,error:"cann't update user"})
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,error});
    }
}

module.exports={signupUser,loginUser,deleteUser,updateUser,getUser}
