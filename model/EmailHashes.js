const mongoose = require('mongoose')
const HashSchema = new mongoose.Schema({
    HashStuff:String,
    userID:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
})
module.exports = mongoose.model("EmailHashes",HashSchema)