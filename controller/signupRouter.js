const signupRouter = require("express").Router()
const User = require("../model/User")
const EmailHashes = require('../model/EmailHashes')
const bcrypt = require("bcrypt")
const crypto = require('crypto')
const sendLoginMail = require('../utils/nodemailer')
const emailValidator = require('email-validator')

signupRouter.get('/verify/:id',async(req,res)=>{
    console.log('started')
    const hashId = req.params['id'];
    console.log(hashId)
    const emailHash= await EmailHashes.findOne({HashStuff:hashId})
    if(!emailHash){
        return res.status(500).send({error:"Account not found"})
    }
    const userId = emailHash.userID
    const user = await User.findById(userId)
    user.Active = true;
    await user.save()
    console.log('done')
    return res.status(200).send({message:"Account is found"})
})

signupRouter.post("/",async(req,res)=>{
    const body = req.body
    let result = emailValidator.validate(body.Email)
    if(!result){
        return res.status(400).send({error:"send valid email"})
    }
    const listOfUser = await User.findOne({Email:body.Email})
    if(listOfUser){
        return res.status(400).send({error:"Email is already taken"})
    }
    const saltRound = 10
    const passHash = await bcrypt.hash(body.Password,saltRound)
    const newUser = new User({
        Email:body.Email,
        Password:passHash
    })
    await newUser.save()
    let hashid = crypto.randomBytes(8).toString('hex')
    const emailHash = new EmailHashes({
        userID:newUser._id,
        HashStuff:hashid
    })
    await emailHash.save()
    sendLoginMail(body.Email,hashid)
    return res.status(200).send({message:"signed up"})
})

module.exports = signupRouter