const User = require('../models/User')
const Thought = require('../models/Thought')

// Create reaction
// Reaction is part of thought model
// id is the mongoose objectid (default)
// reactionbody is required, 280char max
// username is required, the one that created it (:userid is a param)
// createdAt is date at time of submission, format manually
// Store this in the thought's reactions array (:thoughtid is a param)
exports.create = async (req, res) => {
    console.log('REACTION => CREATE')
    if(!req.body.reactionBody) {
        return res.json({ error: 'Please include a reactionBody in your POST request' })
    }
    let createdAt = Date.now()

    await User.findOne({
        id: req.params.userid
    }).then(data => {
        if(!data) {
            return res.json({ error: 'No user found with this ID' })
        }
        const username = data.dataValues.username
        return;
    })

    await Thought.findOne({
        id: req.params.thoughtid
    }).then(data => {
        if(!data) {
            return res.json({ error: 'No thought found with this ID' })
        }
        let theseReactions = data.dataValues.reactions
        let newReaction = {
            reactionBody: req.body.reactionBody,
            username,
            createdAt
        }
        theseReactions.push(newReaction)
        await Thought.findOneAndUpdate({
            id: req.params.thoughtid
        }, {
            reactions: theseReactions
        }).then(data => {
            if(!data) {
                return res.json({ serverError: 'This was a valid request, but the reaction was unable to be created' })
            }
            return res.json({ message: 'Thought successfully updated with the new reaction!' })
        })
    })
}

// Remove reaction by id (:reactionid and :thoughtid are params)
exports.delete = async (req, res) => {
    console.log('REACTION => DELETE')
    let revisedReactionsList = null
    await Thought.findOne({
        id: req.params.thoughtid
    }).then(data => {
        if(!data) {
            return res.json({ error: 'Could not find a thought with this ID' })
        }
        let reactionsList = []
        data.forEach(x => {
            reactionsList.push(x.dataValues.reactions)
        })
        for(i = 0; i < reactionsList.length; i++) {
            if(req.params.reactionid === reactionsList.id) {
                revisedReactionsList = reactionsList.splice(i, 1)
                return;
            }
        }
        if(!revisedReactionsList) {
            return res.json({ error: 'Could not find the requested reaction ID from the requested thought'})
        }
        await Thought.findOneAndUpdate({
            id: req.params.thoughtid
        }, {
            reactions: revisedReactionsList
        }).then(data => {
            if(!data) {
                return res.json({ serverError: 'Could not update the thought with the revised reactions list' })
            }
            return res.json({ message: 'Successfully deleted the reaction' })
        })
        
    })
}