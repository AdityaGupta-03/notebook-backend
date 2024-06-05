const jwt = require("jsonwebtoken");

const fetchUser=(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        return res.status(401).send("Access Denied");
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }
    catch(e){
        res.status(400).send("Invalid Token");
    }
}

module.exports = fetchUser;
