const User = require('../models/User')
const Thought = require('../models/Thought')

// Get all thoughts, and their reactions
exports.getAll = async (req, res) => {
    console.log('THOUGHT => GETALL')
    let allThoughts = []
    await Thought.findAll(
    ).then(data => {
        if(!data) {
            return res.json({ error: 'No thoughts found' })
        }
        data.forEach(x => {
            allThoughts.push(x.dataValues)
        })
        return res.json({ allThoughts: allThoughts })
    })
}

// Get a single thought by id (:thoughtid passed as param)
exports.getOne = async (req, res) => {
    console.log('THOUGHT => GETONE')
    await Thought.findOne({
        id: req.params.thoughtid
    }).then(data => {
        if(!data) {
            return res.json({ error: 'No thought with this ID was found' })
        }
        let thisThought = data.dataValues
        return res.json({ thought: thisThought })
    })
}

// Create a new thought
// Push to user's thought array
// content is required, 1-280 char
// createdAt is time of creation, formatted manually
// username of the one who created it is required (:userid is param)
// Will have reactions array, but empty for now
exports.create = async (req, res) => {
    console.log('THOUGHT => CREATE')
    if(!req.body.content) {
        return res.json({ error: 'Please send content in your POST request' })
    }
    let content = req.body.content
    if(content.length < 1 || content.length > 280) {
        return res.json({ error: 'Content must be between 1 and 280 characters' })
    }
    let createdAt = Date.now()

    await User.findOne({
        id: req.params.userid
    }).then(data => {
        if(!data) {
            return res.json({ error: 'No user with this ID was found' })
        }
        let userThoughts = data.dataValues.thoughts
        let newThought = {
            content,
            createdAt,
            username: data.dataValues.username,
            reactions: []
        }
        const createThought = await Thought.create(newThought)
        createThought.save((error, result) => {
            userThoughts.push(result.id)
            User.findOneAndUpdate({
                id: data.dataValues.id
            }, {
                thoughts: userThoughts
            }).then(data => {
                if(!data) {
                    return res.json({ serverError: 'This was a valid request, but the user was unable to be updated' })
                }
                return res.json({ message: 'Successfully created thought and updated the user' })
            })
        })
    })
}

// Update thought by ID (:thoughtid is param)
exports.update = async (req, res) => {
    console.log('THOUGHT => UPDATE')
    if(!req.body.content) {
        return res.json({ error: 'Please add content in your POST request' })
    }
    await Thought.findOne({
        id: req.params.thoughtid
    }).then(data => {
        if(!data) {
            return res.json({ error: 'Could not find the requested thought ID' })
        }
        await Thought.findOneAndUpdate({
            id: req.params.thoughtid
        }, {
            content: req.body.content
        }, {
            new: true
        }).then(data => {
            if(!data) {
                return res.json({ serverError: 'This was a valid request, but the thought was unable to be updated' })
            }
            return res.json({ message: 'Thought was successfully updated' })
        })
    })
}

// Delete thought by ID (:thoughtid is param)
exports.remove = async (req, res) => {
    console.log('THOUGHT => DELETE')
    await Thought.findOne({
        id: req.params.thoughtid
    }).then(data => {
        if(!data) {
            return res.json({ error: 'Could not find a thought with this ID' })
        }
        await Thought.deleteOne({
            id: req.params.thoughtid
        })
        return res.json({ message: 'Successfully deleted the thought' })
    })
}