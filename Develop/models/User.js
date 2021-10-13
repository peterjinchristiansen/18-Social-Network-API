const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username: String,
    email: String,
    thoughts: [
        String
    ],
    friends: [
        String
    ]
})

const model = mongoose.model('users', UserSchema)