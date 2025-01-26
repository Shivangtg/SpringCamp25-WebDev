const mongoose = require('mongoose');

const taskSchema=new mongoose.Schema({
    user:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    start:{
        type:String,
        required:true
    },
    end:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    }
},{timestamps:true});

module.exports=mongoose.model("Task",taskSchema);
