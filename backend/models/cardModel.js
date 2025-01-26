const mongoose = require('mongoose');

const cardSchema=new mongoose.Schema({
    user:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image_url:{
        type:String,
        default:process.env.DEFAULT_COURSE_PIC
    },
    course_remark:{
        type:String,
    },
},{timestamps:true});

module.exports=mongoose.model("Card",cardSchema);