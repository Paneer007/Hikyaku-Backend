const http = require('http')
const app = require('./app')
const server = http.createServer(app)
const PORT = process.env.PORT||3001
const registerUserHandler = require('./socketEvents/user')
const io = require("socket.io")(server,{
    cors:{
        origin:'*'
    }
})
server.listen(PORT,()=>{
    console.log('Listening on port',PORT)
})
const onConnection =(socket)=>{
    console.log(socket.id)
    registerUserHandler(io,socket)
}
io.on("connection",onConnection)