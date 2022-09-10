const signupRouter = require("express").Router()
const User = require("../model/User")
const bcrypt = require("bcrypt")
signupRouter.post("/",async(req,res)=>{
    console.log('hi')
    const body = req.body
    console.log(body)
    const listOfUser = await User.findOne({Name:body.Name})
    if(listOfUser){
        return res.status(400).send({error:"username is already taken"})
    }
    const saltRound = 10
    const passHash = await bcrypt.hash(body.Password,saltRound)
    const newUser = new User({
        Name:body.Name,
        Password:passHash
    })
    await newUser.save()
    return res.status(200).send({message:"signed up"})
})
module.exports = signupRouter