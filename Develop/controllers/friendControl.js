const User = require('../models/User')

// Add a friend to user's friend's list
// :userid1 and :userid2 both passed as params (user and friend respectively)
exports.add = async (req, res) => {
    console.log('FRIEND => ADD')
    await User.findOne({
        id: req.params.userid
    }).then(data => {
        if(!data) {
            return res.json({ error: 'Could not find user with this ID (userid)' })
        }
        let friendsIDList = data.dataValues.friends
        await User.findOne({
            id: friendid
        }).then(data => {
            if(!data) {
                return res.json({ error: 'Could not find user with this ID (friendid)' })
            }
            friendsIDList.push(data.dataValues.id)
            try {
                await User.updateOne({
                    id: req.params.userid
                }, {
                    friends: friendsIDList
                })
                return res.json({ message: 'Successfully added friend!' })
            } catch (error) {
                return res.json({ serverError: 'This was a valid request, but the friend was unable to be added' })
            }
        })
    })
}

// Remove friend from user's friend's list
// :userid1 and :userid2 both passed as params (user and friend respectively)
exports.remove = async (req, res) => {
    console.log('FRIEND => REMOVE')
    await User.findOne({
        id: req.params.userid
    }).then(data => {
        if(!data) {
            return res.json({ error: 'Could not find user with this ID (userid)' })
        }
        let friendsIDList = data.dataValues.friends
        await User.findOne({
            id: req.params.friendid
        }).then(data => {
            if(!data) {
                return res.json({ error: 'Could not find user with this ID (friendid)' })
            }
            let initialLength = friendsIDList.length
            for(i = 0; i < initialLength; i++) {
                if(data.dataValues.id === friendsIDList[i]) {
                    friendsIDList.splice(i, 1)
                    return;
                }
            }
            if(initialLength === friendsIDList.length - 1) {
                return res.json({ message: 'Successfully removed friend' })
            }
            return res.json({ serverError: 'This was a valid request but the function was not executed properly' })
        })
    })
}