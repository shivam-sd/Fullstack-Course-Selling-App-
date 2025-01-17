const jwt = require("jsonwebtoken");

const adminMiddleware = (req,res,next) => {
    // find headers
    const authHeader = req.headers.authorization;
    // check headers prasent or not
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(404).json({errors:"No Token Provided"});
    }
    
    const token = authHeader.split(" ")[1];
    
    try{
        const decode = jwt.verify(token , process.env.ADMIN_JWT_SECRET);
        req.adminId = decode.id;
        next();
    }catch(error){
        console.log("Invalid token or Expired token" , error);
        res.status(500).json({errors:"invalid token or expired token"});
    }
}

module.exports = adminMiddleware;
