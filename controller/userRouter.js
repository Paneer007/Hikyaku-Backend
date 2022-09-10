const userRouter = require('express').Router()
const User = require('../model/User')
const validateCredentials= require('../middleware/validateCredentials')
userRouter.get('/',validateCredentials,async(req,res)=>{
    let id = res.locals.token.id
    const user = await User.findById(id).populate("Groups")
    return res.status(200).send(user);
})
module.exports = userRouter
