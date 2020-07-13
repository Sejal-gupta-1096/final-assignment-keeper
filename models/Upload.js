const mongoose = require('mongoose')

const uploadSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,

    },
    phone: {
        type: Number,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    range: {
        type: Number,
        required: true
    },
    deadline: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    }
})
const Upload = mongoose.model('upload', uploadSchema)
module.exports = Upload