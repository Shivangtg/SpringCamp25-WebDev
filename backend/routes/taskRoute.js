const express = require('express');

const taskRouter=express.Router();

const {addTask,deleteTask,updateTask,getTask,getSingleTask,getTaskByDateAndId}=require("../controllers/taskController");
const isLoggedIn = require('../middleware/isLoggedIn');

taskRouter.post("/addTask",addTask);
taskRouter.post("/getTask/",getTask);
taskRouter.post("/getTaskByDate/:date",getTaskByDateAndId);
taskRouter.delete("/delete/:id",deleteTask);
taskRouter.patch("/update/:id",updateTask);
taskRouter.post("/getSingleTask/:id",getSingleTask);
module.exports=taskRouter;