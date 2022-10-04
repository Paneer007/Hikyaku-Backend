const signupRouter = require("express").Router()
const User = require("../model/User")
const EmailHashes = require('../model/EmailHashes')
const bcrypt = require("bcrypt")
const crypto = require('crypto')
const sendLoginMail = require('../utils/nodemailer')
const emailValidator = require('email-validator')
signupRouter.post("/",async(req,res)=>{
    const body = req.body
    let result = emailValidator.validate(body.email)
    if(!result){
        return res.status(400).send({error:"send valid email"})
    }
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
    let id = crypto.randomBytes(8).toString('hex')
    const emailHash = new EmailHashes({
        userID:newUser._id,
        Hash:id
    })
    await emailHash.save()
    sendLoginMail(body.email,id)
    return res.status(200).send({message:"signed up"})
})
module.exports = signupRouter