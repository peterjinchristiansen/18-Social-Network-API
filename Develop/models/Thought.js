const mongoose = require('mongoose')
const User = require('./User')

const formatDate = () => {
    return Date.now()
}

const reactionSchema = mongoose.Schema({
    reactionId: mongoose.Schema.Types.ObjectId,
    reactionBody: {
        type: String,
        required: [true, "Please enter a reaction in your request"],
        minlength: 1,
        maxlength: 280,
        validate: [(value) => value.length > 0, 'No body']
    },
    reactionCreator: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Not a valid user ID"],
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const ThoughtSchema = mongoose.Schema({
    thoughtId: mongoose.Schema.Types.ObjectId,
    thoughtText: {
        type: String,
        required: [true, 'Please add a thought to your request'],
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    thoughtCreator: {
        type: String,
        required: [true, "Not a valid user ID"]
    },
    reactions: [reactionSchema]
})

ThoughtSchema.virtual('reactionCount').get(() => {
    return this.reactions.length
})

const model = mongoose.model('thoughts', ThoughtSchema)

module.exports = model