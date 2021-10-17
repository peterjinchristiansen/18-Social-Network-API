const User = require('../models/User')
const Thought = require('../models/Thought')

exports.getAll = async (req, res) => {
    try {
        const getThoughts = await Thought.find()
        return res.json({ thoughts: getThoughts })
    } catch (error) {
        return res.json(error.message)
    }

}

exports.create = async (req, res) => {
    try {
        await Thought.create({
            thoughtText: req.body.thought,
            thoughtCreator: req.params.userid
            }).then(async thought => {
                await User.findByIdAndUpdate(
                    { _id: req.params.userid },
                    { $push: { thoughts: thought._id }}
                )
            })
        return res.json({ message: 'Thought successfully created' })
    } catch (error) {
        return res.json(error.message)
    }
}

exports.getOne = async (req, res) => {
    try {
        const findThought = await Thought.findById(req.params.thoughtid)
        return res.json({ thought: findThought })
    } catch (error) {
        return res.json(error.message)
    }
}

exports.update = async (req, res) => {
    try {
        await Thought.findByIdAndUpdate(
            { _id: req.params.thoughtid },
            { $set: { thoughtText: req.body.thought }}
        )
        return res.json('Thought successfully updated')
    } catch (error) {
        return res.json(error.message)
    }
}

exports.remove = async (req, res) => {
    try {
        const findThoughtCreator = await Thought.findById(req.params.thoughtid)
            .then(thought => {
                console.log(thought._id)
                return thought.thoughtCreator
            })
        await User.findByIdAndUpdate(
            { _id: findThoughtCreator },
            { $pull: { thoughts: req.params.thoughtid }}
        )
        await Thought.findByIdAndDelete(
            { _id: req.params.thoughtid }
        )
        return res.json({ message: 'Thought successfully deleted' })
    } catch (error) {
        return res.json(error.message)
    }
}