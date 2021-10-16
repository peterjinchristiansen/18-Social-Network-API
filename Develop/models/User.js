const mongoose = require('mongoose')
const Thought = require('./Thought')

const UserSchema = mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    thoughts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    friendCount: Number
})

const model = mongoose.model('users', UserSchema)