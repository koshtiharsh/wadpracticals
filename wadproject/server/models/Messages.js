const mongoose = require('mongoose')



const msg = mongoose.Schema({
    sender:String,
    receiver:String,
    message: String,
    timestamp: { type: Date, default: Date.now }
})



const Messages  = mongoose.model('messages',msg)

module.exports = Messages;