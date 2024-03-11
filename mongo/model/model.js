
const mongoose = require('mongoose')
const col1 = mongoose.Schema({
    name:String,
    location: String
})



module.exports = mongoose.model('col1',col1)