import mongoose from 'mongoose'

const itmeSchema = new mongoose.Schema({
    from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    price: { type: String, required: true },
    name: { type: String, required: true },
    desc: { type: String, required: true },
    imgLink: { type: String, required: true },
    boughtCount: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    stars: { type: Number, default: 0 }
})

mongoose.model("Item", itmeSchema)