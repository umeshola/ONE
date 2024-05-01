import mongoose from 'mongoose'
const reviewSchema = new mongoose.Schema({
    by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    on: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
    name: { type: String },
    stars: { type: Number, default: 0 }
})

mongoose.model("Review", reviewSchema)