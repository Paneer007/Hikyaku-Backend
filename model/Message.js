const mongoose= require("mongoose")
const MessageSchema = new mongoose.Schema({
    Content:String,
    Sender:{
        ref:"User",
        Type:mongoose.Types.ObjectId
    }
})
module.exports = mongoose.model("Message",MessageSchema)