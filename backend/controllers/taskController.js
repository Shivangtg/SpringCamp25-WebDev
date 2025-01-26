const { json } = require("express");
const task=require("../models/taskModel");
const user=require("../models/userModel");
const jwt=require("jsonwebtoken");
const addTask=async function(req,res){
    try {
        if( !req.body.title || !req.body.start || !req.body.end || !req.body.user_id || !req.body.date){
            console.log("you nedd to provide atleast title, start time, end time, date and user_id");
            res.status(400).json({success:false,error:"you nedd to provide atleast title, start time, end time ,date and user_id"});
            return ;
        }
        const bodyToPass={...req.body};
        bodyToPass.user_id=null;
        bodyToPass.user=req.body.user_id;
        const newTask=new task(bodyToPass);
        await newTask.save();
        console.log("New task added");
        res.json({success:true,message:"New task added",task:newTask});
    } catch (error) {
        console.log(error)
        res.status(400).json({success:false,error});
    }
}

const deleteTask=async function(req,res){
    if(!req.params.id){
        console.log("please provide id");
        res.json({success:false,error:"please provide id"});
        return ;
    }
    try {
        const taskToBeDeleted=await task.findByIdAndDelete(req.params.id);
        console.log("Task deleted");
        res.json({success:true,message:"Task deleted successfully",deletedTask:taskToBeDeleted});
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,error});
    }
}

const updateTask=async function(req,res){
    if(!req.params.id){
        console.log("please provide id");
        res.json({success:false,error:"please provide id"});
        return ;
    }
    try {
        if(!req.body.title || !req.body.start || !req.body.end){
            console.log("please provide atleast title,start time and end time to update the task");
            res.status(400).json({success:false,error:"please provide atleast title,start time and end time to update the task"})
        }
        const oldTask=await task.findById(req.params.id);
        if(!oldTask){
            console.log("No such task present");
            res.status(400).json({success:false,error:"No such task present"});
            return ;
        }
        const updatedTask=await task.findByIdAndUpdate(req.params.id,req.body);
        console.log("Task Updated");
        res.status(200).json({success:true,message:"Task Updated"});
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,error});
    }
}

const getTask=async function(req,res){
    try {
        const Tasks=await task.find({user:req.body.user_id})  || [];
        console.log("retrieved tasks successfully");
        res.status(200).json({success:true,message:"retrieved tasks successfully",retrievedTasks:Tasks});
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,error});
    }
}

const getSingleTask=async function(req,res){
    if(!req.params.id){
        console.log("please provide id");
        res.json({success:false,error:"please provide id"});
        return ;
    }
    try {
        const Task=await task.findById(req.params.id);
        if(!Task){
            console.log("No such task present");
            res.status(400).json({success:false,error:"No such task present"});
            return ;
        }
        console.log("retrieved task successfully");
        res.status(200).json({success:true,message:"retrieved task successfully",retrievedTask:Task});
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,error});
    }
}


const getTaskByDateAndId=async function(req,res){
    if(!req.params.date){
        console.log("please provide id");
        res.json({success:false,error:"please provide id"});
        return ;
    }
    try {
        const Task=await task.find({date:req.params.date,user:req.body.user_id});
        if(!Task){
            console.log("No such task present");
            res.status(400).json({success:false,error:"No such task present"});
            return ;
        }
        console.log("retrieved task successfully by Date");
        res.status(200).json({success:true,message:"retrieved task successfully by Date",retrievedTasks:Task});
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,error});
    }
}


module.exports={addTask,deleteTask,updateTask,getTask,getSingleTask,getTaskByDateAndId}
