const jwt = require("jsonwebtoken");

const userMiddleware = (req,res,next) => {
    //find authorize headers
    const authHeader = req.headers.authorization;
    // header check if present or not then give a error
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({errors:"No Token Provided"});
    }
    const token = authHeader.split(" ")[1];
    try{
        const decode = jwt.verify(token , process.env.JWT_SECRET);
        req.userId = decode.id;
        next();
    }catch(error){
        res.status(400).json({errors:"Invalid Token And Expired Token"});
        console.log("Invalid Token and expired Token", error);
    }
}

module.exports = {
    userMiddleware,
}