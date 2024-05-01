import mongoose from 'mongoose'
const friendSchema = new mongoose.Schema({
    p1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    p2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

})

mongoose.model("Friend", friendSchema)