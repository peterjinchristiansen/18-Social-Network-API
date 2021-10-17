const router = require('express').Router()
const Thought = require('../models/Thought')

const userControl = require('../controllers/userControl')
const friendControl = require('../controllers/friendControl')
const thoughtControl = require('../controllers/thoughtControl')
const reactionControl = require('../controllers/reactionControl')

router.get('/users', userControl.getAll)
router.get('/users/:userid', userControl.getOne)
router.post('/users', userControl.create)
router.put('/users/:userid', userControl.update)
router.delete('/users/:userid', userControl.delete)
router.post('/users/:userid/friends/:friendid', friendControl.add)
router.delete('/users/:userid/friends/:friendid', friendControl.remove)
router.get('/thoughts', thoughtControl.getAll)
router.get('/thoughts/:thoughtid', thoughtControl.getOne)
router.post('/thoughts/:userid', thoughtControl.create)
router.put('/thoughts/:thoughtid', thoughtControl.update)
router.delete('/thoughts/:thoughtid', thoughtControl.remove)
router.post('/thoughts/:thoughtid/reactions/:userid', reactionControl.create)
router.delete('/thoughts/:thoughtid/reactions/:reactionid', reactionControl.delete)

module.exports = router;

// update thought not updating