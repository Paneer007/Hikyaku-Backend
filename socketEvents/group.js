const Group = require('../model/Group')
const User = require('../model/User')
const Message = require('../model/Message')
const listOfGroups=[]
module.exports = (io, socket) => {
    socket.on("joinGroupMain",async(group)=>{
        console.log('hi momslayer',group)
        socket.join(group)
    })
    socket.on("isTypingMain",async(details)=>{
        console.log('hello Whoree')
        console.log(details)
        io.to(details.room).emit("whoTypingMain",{name:details.name,groupId:details.room})
    })
    // socket.on("sendMessageMain",async(details)=>{
    //     io.to(details.room).emit("whoTyped Main",{name:details.name})
    // })
    socket.on('noMessageSentMain',async(details)=>{
        console.log('bye')
        console.log(details)
        io.to(details.room).emit("whoTypingMain",{name:null,groupId:details.room})
    })
} 