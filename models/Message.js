const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    content: {
        type: String,
    },
    user : {
        type: String,
        required: true
    }
})
const Message = mongoose.model('Message', messageSchema)
module.exports = Message