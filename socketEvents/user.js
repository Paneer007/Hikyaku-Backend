const Group = require('../model/Group')
const User = require('../model/User')
const listOfUser=[]
module.exports = (io, socket) => {
    socket.on("send-message",(message)=>{
        console.log(message)
        socket.emit("sent-message",message)
    } );
    socket.on("join-room",(room)=>{
        console.log('im alive')
        console.log(room)
        socket.join(room)
    })
}