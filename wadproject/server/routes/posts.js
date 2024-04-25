const express = require('express')

const { getFeedPosts, getUserPosts, likePosts, addComment } = require('../controllers/posts.js');
const { verify } = require('jsonwebtoken');
const verifyToken = require('../middleware/auth.js');

const router = express.Router();


router.get('/', getFeedPosts)
router.get('/:userId/posts', verifyToken, getUserPosts)

router.patch('/:id/like', verifyToken, likePosts)

// for comments 

router.post('/addnewcomment', addComment)

module.exports = router;



