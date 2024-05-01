import mongoose from 'mongoose'
const commentSchema = new mongoose.Schema({
    on: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    time: {
        type: Date,
    },
    name: {
        type: String,
        required: true
    }
})

mongoose.model("Comment", commentSchema)