const Post = require('../models/Post.js')
const User = require("../models/Users.js")

// create function

const createPost = async (req, res) => {
    try {


        const { userId, description, picturepath } = req.body;
        const user = await User.findById(userId)

        const newPosts = new Post({
            userId,
            firstName: user.firstName
            ,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturepath,
            picturepath,
            likes: {},



        })

        await newPosts.save()
        const post = await Post.find()
        res.status(201).json(post)

    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}
const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find()
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({ error: error.message })

    }
}

const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({ userId })
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({ error: error.message })

    }
}


// update comments and like 

const likePosts = async (req, res) => {
    try {
        const { id } = req.params;

        const { userId } = req.body
        const post = await Post.findById(id)
        const isLiked = post.likes.get(userId);
        if (isLiked) {
            post.likes.delete(userId)
        } else {
            post.likes.set(userId, true)
        }

        const updatedPost = await Post.findByIdAndUpdate(id, { likes: post.likes }, { new: true })


        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(404).json({ error: error.message })

    }
}


const addComment = async (req, res) => {
    try {
        const { postUserId, logInUserId, commentText } = req.body;

        const post = await Post.findById(postUserId);
        console.log(postUserId)
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // If the post doesn't have a comments object, initialize it


        // Add the new comment to the comments object
        post.comments[logInUserId] = commentText;

        // Save the updated post
        // const updatedPost = await post.save();
        const updatedPost = await Post.findByIdAndUpdate(postUserId, { comments: post.comments }, { new: true });
        console.log(updatedPost);

        // Respond with the updated post
        res.status(201).json(updatedPost);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};






module.exports = { createPost, getFeedPosts, getUserPosts, likePosts, addComment }