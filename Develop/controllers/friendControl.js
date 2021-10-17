const User = require('../models/User')

exports.add = async (req, res) => {
    try {
        await User.findByIdAndUpdate(
            { _id: req.params.userid },
            { $push: { friends: req.params.friendid } }
        )
        return res.json({ message: 'Friend successfully added to user' })
    } catch (error) {
        return res.json(error.message)
    }
}

exports.remove = async (req, res) => {
    try {
        await User.findByIdAndUpdate(
            { _id: req.params.userid },
            { $pull: { friends: req.params.friendid } }
        )
        return res.json({ message: 'Friend successfully deleted' })
    } catch (error) {
        return res.json(error.message)
    }
}