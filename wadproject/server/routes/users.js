const express = require('express')

const {getUser,getUserFriends,addRemoveFriends}  = require('../controllers/users.js');
const { verify } = require('jsonwebtoken');
const verifyToken = require('../middleware/auth.js');

const router = express.Router();

router.get('/:id',getUser)
router.get('/:id/friends',verifyToken,getUserFriends)


router.patch("/:id/:friendId",verifyToken,addRemoveFriends);
module.exports =router;