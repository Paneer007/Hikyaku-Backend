const userRouter = require('express').Router()
const User = require('../model/User')
const validateCredentials= require('../middleware/validateCredentials')
userRouter.get('/',validateCredentials,async(req,res)=>{
    let id = res.locals.token.id
    const user = await User.findById(id).populate("Groups")
    return res.status(200).send(user);
})
userRouter.post('/updateuser',validateCredentials,async(req,res)=>{
    let id = res.locals.token.id
    console.log('hey',req.body)
    console.log("This is the thingy")
    const user = await User.findById(id);
    console.log("this is the user",user)
    let body = req.body
    user.Name = body.Name
    user.Bio = body.Bio
    await user.save()
    return res.status(200).send({message:"your mam"})
})
module.exports = userRouter
