const mongoose = require('mongoose');

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    useremail:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    userimage:{
        type:String,
        default:process.env.DEFAULT_PROFILE_PIC
    }
},{timestamps:true});

module.exports=mongoose.model("User",userSchema);
