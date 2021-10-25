const User = require('../models/User')

exports.add = async (req, res) => {
    try {
        await User.findByIdAndUpdate(
            { _id: req.params.userid },
            { $push: { friends: req.params.friendid } }
        )
        return res.json({ MESSAGE: 'Friend successfully added to user' })
    } catch (error) {
        return res.json({ ERROR: error.message })
    }
}

exports.remove = async (req, res) => {
    try {
        await User.findByIdAndUpdate(
            { _id: req.params.userid },
            { $pull: { friends: req.params.friendid } }
        )
        return res.json({ MESSAGE: 'Friend successfully deleted' })
    } catch (error) {
        return res.json({ ERROR: error.message })
    }
}