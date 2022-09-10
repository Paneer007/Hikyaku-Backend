const mongoose= require('mongoose')
const UserSchema = new mongoose.Schema({
    Name:String,
    Password:String,
    Groups:[
        {
            type:mongoose.Types.ObjectId,
            ref:"Group"
        }
    ]
})
module.exports = mongoose.model("User",UserSchema)
