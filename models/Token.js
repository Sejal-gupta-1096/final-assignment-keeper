const mongoose = require('mongoose')

const tokenSchema = mongoose.Schema({
    _userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    }

})
const Token = mongoose.model('token', tokenSchema)
module.exports = Token