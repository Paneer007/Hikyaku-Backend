const Group = require('../model/Group')
const User = require('../model/User')
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
    socket.on("sendMessage",(messageBody)=>{
        console.log(messageBody)
        console.log("message is sent")
        printOutTheUsers(messageBody.room,io)
        socket.in(messageBody.room).emit("sentMessage",messageBody.message)
        //socket.emit("sentMessage",message)
    } );
    socket.on("joinRoom",async(room)=>{
        console.log(room)
        socket.join(room)
    })
}