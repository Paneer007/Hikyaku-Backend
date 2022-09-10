const User = require("../model/User")
const loginRouter= require("express").Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

loginRouter.post('/',async(req,res)=>{
    const body= req.body
    console.log(body)
    const user = await User.findOne({Name:body.Name})
    if(user==undefined){
        return res.status(400).send({error:"user has not made an account"})
    }
    const passValid = bcrypt.compare(body.Password,user.Password)
    if(!passValid){
        return res.status(400).send({message:"error user not found"})
    }
    const tokenBody = {id:user._id,username:body.Name}
    const jwtToken = jwt.sign(tokenBody,process.env.SECRET)
    await user.save()
    res.cookie('jwt',jwtToken,{httpOnly:true})
    return res.status(200).send({jwtToken:jwtToken})
})

module.exports = loginRouter