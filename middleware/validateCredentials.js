const getToken = require('../utils/token')
const jwt = require('jsonwebtoken')
const validateCredentials = (req,res,next)=>{
    const token = getToken(req)
    if(!token){
        return res.status(400).send({error:"no token provided"})
    }
    const tokenVal = jwt.verify(token,process.env.SECRET)
    if(!tokenVal){
        return res.status(401).send({error:"Unauthorized access"})
    }
    res.locals.token = tokenVal
    next()
}
module.exports= validateCredentials