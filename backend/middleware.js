const { JWT_TOKEN } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware =(res,req,next) => {

    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.json({
            message : "user not authenticated"
        })
    }

    const token = authHeader.split("")[1]

    try{
        const decoded =jwt.varify(token,JWT_TOKEN)


         req.userId = decoded.userId 

         next();

    }catch{

         return res.json({message : "invalid token"})

    }




    module.export = {
        authmiddleware
    }

}