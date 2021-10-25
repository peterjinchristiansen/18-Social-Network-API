const User = require('../models/User')
const Thought = require('../models/Thought')

const testEmail = (email) => {
    let regexExpression = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
    if(!regexExpression.test(email)) {
        return false
    } else {
        return true
    }
}

exports.getAll = async (req, res) => {
    try {
        const getUsers = await User.find()
        return res.json({ USERS: getUsers })
    } catch (error) {
        return res.json({ ERROR: error.message })
    }
}

exports.create = async (req, res) => {
    if(!testEmail(req.body.email)) {
        return res.json({ ERROR: 'Email invalid' })
    }
    try {
        await User.create({
            username: req.body.username,
            email: req.body.email
        })
        return res.json({ MESSAGE: 'User successfully created' })
    } catch (error) {
        return res.json({ ERROR: error.message })
    }
}

exports.getOne = async (req, res) => {
    const findUser = await User.findById(req.params.userid)
    return res.json({ USER: findUser })
        .catch(error => {
            return res.json({ ERROR: error.message })
        })
}

exports.update = async (req, res) => {
    if(!testEmail(req.body.email)) {
        return res.json({ ERROR: 'Email invalid' })
    }
    try {
        await User.findByIdAndUpdate(
            { _id: req.params.userid },
            { $set: req.body }
        )
        return res.json({ MESSAGE: 'User successfully updated'} )
    } catch (error) {
        return res.json({ ERROR: error.message })
    }
}

exports.delete = async (req, res) => {
    await User.findByIdAndDelete(req.params.userid)
        .then(async () => {
            await Thought.deleteMany(
                { thoughtCreator: req.params.userid }
            )
            return res.json({ MESSAGE: 'User successfully deleted' })
        }).catch(error => {
            return res.json({ ERROR: error.message })
        })
}