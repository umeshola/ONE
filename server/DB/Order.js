import mongoose from 'mongoose'
const orderSchema = new mongoose.Schema({
    of: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    for: { type: mongoose.Schema.Types.ObjectId, ref: "Item" }
})

mongoose.model("Order", orderSchema)