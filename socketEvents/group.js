const Group = require('../model/Group')
const User = require('../model/User')
const Message = require('../model/Message')
const listOfGroups=[]
module.exports = (io, socket) => {
    socket.on("joinGroupMain",async(group)=>{
        socket.join(group)
    })
    socket.on("isTypingMain",async(details)=>{
        io.to(details.groupId).emit("whoTypingMain",{name:details.name,groupId:details.groupId})
    })
    // socket.on("sendMessageMain",async(details)=>{
    //     io.to(details.room).emit("whoTypedMain",{name:details.name})
    // })
    socket.on('noMessageSentMain',async(details)=>{
        io.to(details.room).emit("whoTypedMain",{name:NULL})
    })
}