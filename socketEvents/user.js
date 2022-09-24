const Group = require('../model/Group')
const User = require('../model/User')
const listOfUser=[]
module.exports = (io, socket) => {
    socket.on("send-message",(message)=>{
        console.log(message)
        socket.emit("sent-message",message)
    } );
    socket.on("join-room",async(room)=>{
        console.log(room)
        //socket.join(room)
        const sockets = await io.in(room).fetchSockets();
        sockets.forEach(x=>{
            console.log(x.nickname)
        })
    })
}