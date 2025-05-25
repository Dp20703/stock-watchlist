const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
    symbol: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
})

module.exports = mongoose.model('watchlist', watchlistSchema);