const mongoose = require('mongoose')

const ThoughtSchema = mongoose.Schema({
    content: String,
    createdAt: Date,
    username: [
        String
    ],
    reactions: [{
        id: String,
        reactionBody: String,
        username: String,
        createdAt: Date
    }]
})

const model = mongoose.model('thoughts', ThoughtSchema)