const mongoose = require('mongoose')
const User = require('User')

const formatDate = () => {
    return Date.now()
}

const ThoughtSchema = mongoose.Schema({
    thoughtId: mongoose.Schema.Types.ObjectId,
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        get: formatDate()
    },
    thoughtCreator: {
        type: String,
        required: true
    },
    reactions: [new Schema({
        reactionId: mongoose.Schema.Types.ObjectId,
        reactionBody: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        username: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: formatDate()
        }
    })]
})

const model = mongoose.model('thoughts', ThoughtSchema)