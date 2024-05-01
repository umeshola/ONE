import mongoose from 'mongoose'
const friendrequiestSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

})

mongoose.model("Friendrequest", friendrequiestSchema)