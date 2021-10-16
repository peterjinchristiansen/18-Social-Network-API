const mongoose = require('mongoose')
const User = require('../models/User')
const Thought = require('../models/Thought')

// Get all existing users

exports.getAll = async (req, res) => {
    let allUsers = []
    const getUser = await User.findAll({ id: req.params.id })
}

exports.getAll = async (req, res) => {
    console.log('USER => GETALL')
    let allUsers = []
    await User.findAll(
        ).then(data => {
            if(!data) {
                return res.json({ error: 'No users in database' })
            }
            data.forEach(x => {
                allUsers.push(x.dataValues)
            })
            return res.json({ allUsers: allUsers })
        })
}

// Get user by their ID (:userid passed as param)
// Also get their thoughts and friend data
exports.getOne = async (req, res) => {
    console.log('USER => GETONE')
    let thoughts = []
    let friends = []

    await User.findOne({
        id: req.params.id
    }).then(data => {
        if(!data) {
            return res.json({ error: 'User does not exist' })
        }
        let thisUser = data.dataValues
        let thoughtIDList = thisUser.thoughts
        let friendIDList = thisUser.friends
        thoughtIDList.forEach(x => {
            await Thought.findOne({
                id: x
            }).then(data => {
                if(!data) {
                    return res.json({ error: 'This user has a thought that does not exist' })
                }
                thoughts.push(data.dataValues)
            })
        })
        friendIDList.forEach(x => {
            await User.findOne({
                id: x
            }).then(data => {
                if(!data) {
                    return res.json({ error: 'This user has a friend that does not exist' })
                }
                friends.push(data.dataValues)
            })
        })
        thisUser['friends'] = friends;
        thisUser['thoughts'] = thoughts;
        thisUser['friendCount'] = friends.length;
        return res.json({ user: thisUser })
    })
}

// Create a user
// Username is unique, required, trimmed
// email is vaild (regex), unique, required
// they will have thoughts/friends as well, but empty for now
exports.create = async (req, res) => {
    console.log('USER => CREATE')
    let regexExpression = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if(!req.body.username) {
        return res.json({ error: 'Please send a username in your POST request!' })
    }
    if(!req.body.email) {
        return res.json({ error: 'Please send an email in your POST request!' })
    }
    let { username, email } = req.body
    let validateEmail = regexExpression.test(email)
    if(!validateEmail) {
        return res.json({ error: 'Your email is not valid' })
    }
    await User.findOne({
        username: username
    }).then(data => {
        if(data) {
            return res.json({ error: 'Username already in use' })
        }
        return;
    })
    await User.findOne({
        email: email
    }).then(data => {
        if(data) {
            return res.json({ error: 'Email already in use' })
        }
        return;
    })
    username = username.trim()
    let newUser = {
        username,
        email,
        thoughts: [],
        friends: [],
        friendCount: 0
    }
    await User.create(newUser)
}

// Update a user by their id (:userid passed as param)
exports.update = async (req, res) => {
    console.log('USER => UPDATE')
    if(!req.body.username && !req.body.email) {
        return res.json({ error: 'Please enter a username, email, or both in your request' })
    }
    await User.findOne({
        id: req.params.userid
    }).then(data => {
        if(!data) {
            return res.json({ error: 'Requested user does not exist' })
        }
        await User.findOneAndUpdate({
            id: req.params.userid
        }, {
            username: req.body.username,
            email: req.body.email
        }, {
            new: true
        }).then(data => {
            if(!data) {
                return res.json({ serverError: 'This was a valid request, but the user was unable to be updated' })
            }
            return res.json({ message: `Successfully updated to: ${data}` })
        })
    })
}

// Delete a user by their id (:userid passed as param)
// Also delete their thoughts
exports.delete = async (req, res) => {
    console.log('USER => DELETE')
    await User.findOne({
        id: req.params.userid
    }).then(data => {
        if(!data) {
            return res.json({ error: 'Could not find a user with this ID' })
        }
        const username = data.dataValues.username;
        return;
    })
    try {
        await User.deleteOne({
            id: req.params.userid
        })
        await Thought.deleteMany({
            username: username
        })
        return res.json({ message: 'Successfully deleted user and their associated thoughts' })
    } catch (error) {
        return res.json({ serverError: 'This was a valid request, but the user was unable to be deleted' })
    }
}