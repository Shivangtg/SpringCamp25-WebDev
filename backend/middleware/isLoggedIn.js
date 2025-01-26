const jwt=require("jsonwebtoken");

const isLoggedIn=function(req,res,next){
    
    const token=req.headers["authorization"].split(" ")[1];
    try {
        const isVerified=jwt.verify(token,process.env.SECRET_KEY);
        if(isVerified){
            req.body.user_id=isVerified._id
            next();
            return ;
        }
        console.log("can't verify the user")
        res.status(400).json({success:false,message:"can't verify the user",error:"can't verify the user"})
    } catch (error) {
        console.log("error in verification",error)
        res.status(400).json({success:false,message:"error in verification",error})
    }
}

module.exports=isLoggedIn