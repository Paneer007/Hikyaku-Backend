const mongoose= require('mongoose')
const UserSchema = new mongoose.Schema({
    Image:String,
    Name:String,
    Email:String,
    Password:String,
    Bio:String,
    Active:{
        type: Boolean,
        enum:[false,true],
        default:false
    },
    Groups:[
        {
            type:mongoose.Types.ObjectId,
            ref:"Group"
        }
    ]
})
module.exports = mongoose.model("User",UserSchema)
 