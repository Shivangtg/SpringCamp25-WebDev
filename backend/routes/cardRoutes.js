const express = require('express');

const cardRouter=express.Router();

const {addCard,deleteCard,updateCard,getCard,getSingleCard}=require("../controllers/cardController.js");

cardRouter.post("/addCard",addCard);
cardRouter.post("/getCard/",getCard);
cardRouter.delete("/delete/:id",deleteCard);
cardRouter.post("/getSingleCard/",getSingleCard);
cardRouter.patch("/update/:id",updateCard);

module.exports=cardRouter;