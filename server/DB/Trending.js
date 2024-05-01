import mongoose from 'mongoose';

const trendingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        required: true,
        default: 1,
    },
});

const Trending = mongoose.model('Trending', trendingSchema);