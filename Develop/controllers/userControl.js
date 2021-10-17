const User = require('../models/User')
const Thought = require('../models/Thought')

exports.getAll = async (req, res) => {
    try {
        const getUsers = await User.find()
        return res.json({ users: getUsers })
    } catch (error) {
        return res.json(error.message)
    }

}

exports.create = async (req, res) => {
    try {
        await User.create({
            username: req.body.username,
            email: req.body.email
        })
        return res.json({ message: 'User successfully created' })
    } catch (error) {
        return res.json(error.message)
    }
}

exports.getOne = async (req, res) => {
    try {
        const findUser = await User.findById(req.params.userid)
        return res.json({ user: findUser })
    } catch (error) {
        return res.json(error.message)
    }
}

exports.update = async (req, res) => {
    try {
        await User.findByIdAndUpdate(
            { _id: req.params.userid },
            { $set: req.body }
        )
        return res.json('User successfully updated')
    } catch (error) {
        return res.json(error.message)
    }
}

exports.delete = async (req, res) => {
    try {
        await User.find(
            { _id: req.params.userid }
        )
        await Thought.deleteMany(
            { thoughtCreator: req.params.userid }
        )
        return res.json({ message: 'User successfully deleted' })
    } catch (error) {
        return res.json(error.message)
    }
}