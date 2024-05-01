import mongoose from 'mongoose'
const cartSchema = new mongoose.Schema({
    of: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    which: { type: mongoose.Schema.Types.ObjectId, ref: "Item" }
})

mongoose.model("Cart", cartSchema)