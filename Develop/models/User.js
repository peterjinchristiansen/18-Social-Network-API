const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        unique: true,
        required: [true, 'You must send a username in your request'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'You must send an email in your request'],
        unique: true
    },
    thoughts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
})

UserSchema.virtual('reactionCount').get(function () {
    return this.friends.length
})

const model = mongoose.model('users', UserSchema)

module.exports = model