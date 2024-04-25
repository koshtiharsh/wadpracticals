const express = require('express')

const {getUser,getUserFriends,addRemoveFriends}  = require('../controllers/users.js');
const { verify } = require('jsonwebtoken');
const verifyToken = require('../middleware/auth.js');
const { addmessage, getUsers, getMessages } = require('../controllers/message.js');

const router = express.Router();



router.post('/addmessage',addmessage)
router.post('/getmessages',getUsers)
router.post('/chats',getMessages)



module.exports = router;