const {jwt, SECRET_KEY_ACCESS} = require("../config/jwt")
module.exports = function authMiddleware(req,res,next){
    const authHeader = req.headers.authorization

    if(!authHeader){
        return res.status(401).json({message:"Silahkan Login Terlebih Dahulu"})
    }

    const tokenAccess = authHeader.split(" ")[1]

    try{
        const decode = jwt.verify(tokenAccess, SECRET_KEY_ACCESS)
        req.user = decode
        next()
    }
    catch{
        res.status(401).json({message:"Sesi login habis, silakan login ulang"})
    }
}