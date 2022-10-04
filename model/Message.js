const mongoose= require("mongoose")
const MessageSchema = new mongoose.Schema({
    message:String,
    name:String,
    group:{
        type:mongoose.Types.ObjectId,
        ref:"Group",

    },
    sender:{
        ref:"User",
        type:mongoose.Types.ObjectId
    }
})
module.exports = mongoose.model("Message",MessageSchema)