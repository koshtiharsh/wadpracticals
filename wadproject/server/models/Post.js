
const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(

    {
        userId: {
            type: String,
            required: true

        },
        firstName: {
            type: String,
            required: true

        },
        lastName: {
            type: String,


        },
        location: {
            type: String,


        },
        description: String,
        picturepath: String,
        userPicturePath: String,
        likes: {
            type: Map,
            of: Boolean,

        },
        comments: {
            type: Object,
            default: {}
        }

    }, { timestamps: true }


)


const Post = mongoose.model('Post', postSchema)

module.exports = Post;