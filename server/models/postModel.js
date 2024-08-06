const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    uid: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    topics: [String],
    comments: [String],
})

module.exports = mongoose.model('post', postSchema)