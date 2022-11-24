const mongoose = require('mongoose');

// const hashtagSchema = mongoose.Schema({
//     hashtag: String,
// });

const tweetSchema = mongoose.Schema({
    message: String,
    date: Date,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    // hashtags: [hashtagSchema],
    hashtags: [String],
});

const Tweet = mongoose.model('tweets', tweetSchema);

module.exports = Tweet;