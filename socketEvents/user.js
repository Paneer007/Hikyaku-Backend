const Group = require('../model/Group')
const User = require('../model/User')
const Message = require('../model/Message')
const listOfUser=[]
const printOutTheUsers=async(room,io)=>{
    //console.log(room)
    const sockets =  await io.in(room).fetchSockets();
    //console.log(sockets)
    sockets.forEach(x=>{
        console.log("hello pa",x.nickname)
    })
}
module.exports = (io, socket) => {
    socket.on("sendMessage",async(messageBody)=>{

        console.log("LISTEN UP MESSAGE IS BEING SENT HERE")
        console.log(messageBody)
        console.log("message is sent")
        const group = await Group.findOne({RoomId:messageBody.room}) 
        const newMessage = new Message({message:messageBody.message,sender:messageBody.user,group:group._id,name:messageBody.name})
        await newMessage.save();
        group.Messages= [...group.Messages,newMessage._id] 
        group.LastMessage={name:messageBody.name,message:messageBody.message}
        await group.save()
        console.log('done')
        console.log(messageBody.room)
        io.to(messageBody.room).emit("sentMessage",{name:messageBody.name,message:messageBody.message})
        
        //socket.emit("sentMessage",{name:messageBody.name,message:messageBody.message})
    } ); 
    socket.on("joinRoom",async(room)=>{
        //console.log(room)
        //printOutTheUsers(room,io)
        socket.join(room)
    })
    socket.on("isTyping",async(details)=>{
        console.log(details.room)
        io.to(details.room).emit("whoTyped",{name:details.name})
    })
    socket.on("noMessageSent",async(details)=>{
        io.to(details.room).emit("whoTyped",{name:"urmo"})
    })
}