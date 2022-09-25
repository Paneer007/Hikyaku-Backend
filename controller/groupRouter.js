const groupRouter = require('express').Router()
const validateCredentials = require('../middleware/validateCredentials')
const Group = require('../model/Group')
const User = require('../model/User')
const { v4: uuidv4 } = require('uuid');
groupRouter.get('/:id',validateCredentials, async(req,res)=>{
    let id = req.params.id
    const tokenBody = res.locals.token
    const group = await Group.findById(id)
    const checkIfMemberInGroup = (group.Members.includes(tokenBody.id))
    if(!checkIfMemberInGroup){
        return res.status(400).send({message:"unauthorised access"})
    }
    await group.populate('Members')
    // try{
    //     await group.populate('Messages')
    // }catch(e){
    //     console.log('error with old schema')
    // }
    return res.status(200).send(group)
})
groupRouter.post('/newgroup',validateCredentials,async(req,res)=>{
    let data = req.body
    let tokenBody = res.locals.token
    console.log(tokenBody)
    let newGroup = new Group({
        Name:data.group,
        Description:data.description,
        RoomId:uuidv4(),
        Admin:tokenBody.id,
        Members:[tokenBody.id],
        Messages:[]
    })
    await newGroup.save()
    let currentUser = await User.findById(tokenBody.id)
    currentUser.Groups= [...currentUser.Groups,newGroup._id];
    currentUser.save();
    console.log('im done')
    return res.status(200).send({message:"everything is sent"})
})
groupRouter.post("/joingroup",validateCredentials,async(req,res)=>{
    let data = req.body;
    let tokenBody = res.locals.token
    console.log(data)
    let group = await Group.findOne({RoomId:data.roomId})
    let currentUser = await User.findById(tokenBody.id)
    const checkIfMemberInGroup = (group.Members.includes(tokenBody.id))
    if(checkIfMemberInGroup){
        return res.status(400).send({message:"already part of group"})
    }
    currentUser.Groups= [...currentUser.Groups, group._id ]
    group.Members = [...group.Members, currentUser._id]
    group.save()
    currentUser.save()
    return res.status(200).send({message:"all chill"})
})
module.exports = groupRouter