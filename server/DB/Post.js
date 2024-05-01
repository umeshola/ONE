import mongoose from 'mongoose'
const postSchema = new mongoose.Schema({
    imgLink: {
        type: String,
        required: true
    },
    imgdesc: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: {
        type: Number,
        default: 0
    },
    zone: {
        type: String,
        required: true
    },
    p: {
        type: Boolean,
        required: true
    },
    by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

})

mongoose.model("Post", postSchema)