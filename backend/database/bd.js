const mongoose = require('mongoose');

const connectToDB=async function(){
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected to database")
    } catch (error) {
        console.log(error)
    }
}

module.exports=connectToDB
