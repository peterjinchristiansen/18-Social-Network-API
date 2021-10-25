const mongoose = require('mongoose')
const moment = require('moment')

const formatDate = (timestamp) => {
    return moment(timestamp).format('dddd, MMMM Do YYYY, h:mm a')
}

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
    reactions: [mongoose.Schema({
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
            get: timestamp => formatDate(timestamp)
        }
    }, {
        toJSON: { getters: true }
    })]
}, {
    toJSON: { getters: true }
})

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
})

const model = mongoose.model('thoughts', ThoughtSchema)

module.exports = model