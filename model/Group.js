const mongoose= require('mongoose')
const GroupSchema = new mongoose.Schema({
    Name:String,
    Description:String,
    RoomId:String,
    Members:[
        {
            type:mongoose.Types.ObjectId,
            ref:"User"
        }
    ],
    Messages:[
        {
            type:mongoose.Types.ObjectId,
            ref:"Message"
        }
    ]
})
module.exports = mongoose.model("Group",GroupSchema)
