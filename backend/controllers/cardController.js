const { json } = require("express");
const card=require("../models/cardModel");
const user=require("../models/userModel");
const jwt=require("jsonwebtoken");
const addCard=async function(req,res){
    try {
        if( !req.body.title || !req.body.description || !req.body.user_id){
            console.log("you nedd to provide atleast title, description and user_id");
            res.status(400).json({success:false,error:"you nedd to provide atleast title, description and user_id"});
            return ;
        }
        const bodyToPass={...req.body};
        bodyToPass.user_id=null;
        bodyToPass.user=req.body.user_id;
        const newcard=new card(bodyToPass);
        await newcard.save();
        console.log("New card added");
        res.json({success:true,message:"New card added",id:newcard._id});
    } catch (error) {
        console.log(error)
        res.status(400).json({success:false,error});
    }
}

const deleteCard=async function(req,res){
    if(!req.params.id){
        console.log("please provide id");
        res.json({success:false,error:"please provide id"});
        return ;
    }
    try {
        const cardToBeDeleted=await card.findByIdAndDelete(req.params.id);
        console.log("card deleted");
        res.json({success:true,message:"card deleted successfully",deletedcard:cardToBeDeleted});
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,error});
    }
}

const updateCard=async function(req,res){
    if(!req.params.id){
        console.log("please provide id");
        res.json({success:false,error:"please provide id"});
        return ;
    }
    try {
        if(!req.body.title || !req.body.description){
            console.log("please provide atleast title and description to update the card");
            res.status(400).json({success:false,error:"please provide atleast title and description to update the card"})
        }
        const oldCard=await card.findById(req.params.id);
        if(!oldCard){
            console.log("No such card present");
            res.status(400).json({success:false,error:"No such card present"});
            return ;
        }
        const updatedCard=await card.findByIdAndUpdate(req.params.id,req.body);
        console.log("card Updated");
        res.status(200).json({success:true,message:"card Updated"});
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,error});
    }
}

const getCard=async function(req,res){
    try {
        const cards=await card.find({user:req.body.user_id})  || [];
        console.log("retrieved cards successfully");
        res.status(200).json({success:true,message:"retrieved cards successfully",retrievedcards:cards});
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,error});
    }
}

const getSingleCard=async function(req,res){
    if(!req.params.id){
        console.log("please provide id");
        res.json({success:false,error:"please provide id"});
        return ;
    }
    try {
        const card=await card.findById(req.params.id);
        if(!card){
            console.log("No such card present");
            res.status(400).json({success:false,error:"No such card present"});
            return ;
        }
        console.log("retrieved card successfully");
        res.status(200).json({success:true,message:"retrieved card successfully",retrievedcard:card});
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,error});
    }
}

module.exports={addCard,deleteCard,updateCard,getCard,getSingleCard}
