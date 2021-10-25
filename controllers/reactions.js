const Thought = require('../models/Thought')

exports.create = async (req, res) => {
    try {
        await Thought.findByIdAndUpdate(
            { _id: req.params.thoughtid },
            { $push: { reactions: { 
                reactionBody: req.body.reaction,
                reactionCreator: req.params.userid
            }}},
            { runValidators: true }
        )
        return res.json({ MESSAGE: 'Reaction successfully created' })
    } catch (error) {
        return res.json({ ERROR: error.message })
    }
}

exports.delete = async (req, res) => {
    try {
        await Thought.findByIdAndUpdate(
            { _id: req.params.thoughtid },
            { $pull: { reactions: { _id: req.params.reactionid }}}
        )
        return res.json({ MESSAGE: 'Reaction successfully deleted' })
    } catch (error) {
        return res.json({ ERROR: error.message })
    }
}