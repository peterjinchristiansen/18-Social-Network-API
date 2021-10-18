const mongoose = require('mongoose')

const formatDate = (timestamp) => {
    timestamp = timestamp.toString().split(' ')
    return `${timestamp[1]} ${timestamp[2]}, ${timestamp[3]}`
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
        default: Date.now(),
        get: formatDate
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
        default: Date.now(),
        get: timestamp => formatDate(timestamp)
    },
    thoughtCreator: {
        type: String,
        required: [true, "Not a valid user ID"]
    },
    reactions: [reactionSchema]
}, {
    toJSON: { getters: true }
})

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
})

const model = mongoose.model('thoughts', ThoughtSchema)

module.exports = model