require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const signupRouter= require('./controller/signupRouter');
const loginRouter= require('./controller/loginRouter');
const userRouter = require('./controller/userRouter')
const groupRouter = require('./controller/groupRouter')
const session = require('express-session');
const MongoStore = require('connect-mongo');
app.use(express.json())
app.use(session({
    secret:process.env.SESSIONTHINGY,
    store:MongoStore.create({
        mongoUrl:process.env.MONGO_URL
    })
}))
try{
    mongoose.connect(process.env.MONGO_URL)
    console.log('no error') 
}catch(error){
    console.log('error')
}
app.use(express.static('build'))
app.use(cors())
app.use('/api/login',loginRouter)
app.use('/api/signup',signupRouter)
app.use('/api/userdata',userRouter)
app.use('/api/groupdata',groupRouter)
module.exports = app;