const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Tweet = require('../models/tweets');
const { checkBody } = require('../modules/checkBody');

// POST: allow to create a new message to DB
// Response: result, tweet
router.post('/new', async (req, res) => {
    if (checkBody(req.body, ['message', 'token'])) {
        const { message, token } = req.body;
        if (message.length <= 280) {
            const foundUser = await User.findOne({ token });

            if (foundUser) {
                const hashtags = (message.match(/#\w+/gi) || []).map(hashtag => hashtag.slice(1));

                const newTweet = new Tweet({
                    message,
                    date: new Date(),
                    user: foundUser._id,
                    hashtags,
                });

                try {
                    const tweet = await newTweet.save();
                    res.json({ result: true, tweet });
                } catch (error) {
                    res.json({ result: false, error });
                }
            } else res.json({ result: false, error: 'User not found' });
        } else res.json({ result: false, error: 'Message is too long ' });
    } else res.json({ result: false, error: 'Missong or empty fields' });
});

// DELETE: allow to delete a message from DB
// Response: result
router.delete('/delete', async (req, res) => {
    if (checkBody(req.body, ['date', 'token'])) {
        const { date, token } = req.body;
        const foundUser = await User.findOne({ token });

        if (foundUser) {
            const foundTweet = await Tweet.findOneAndDelete({ date: new Date(date), user: foundUser._id });

            if (foundTweet) {
                res.json({ result: true });
            } else res.json({ result: false, error: 'Message not found' });
        } else res.json({ result: false, error: 'User not found' });
    } else res.json({ result: false, error: 'Missong or empty fields' });
});

// GET: take the last
const numOfLast = 20; // tweets
// Response: result, tweets (tweets sorted by date from more recent)
router.get('/lasts', async (req, res) => {
    const tweets = await Tweet.find().sort({ date: -1 });
    tweets[0] ?
        res.json({ result: true, tweets: tweets.slice(0, numOfLast) }) :
        res.json({ result: false, error: 'No Tweet' });
});

// GET: Find tweets with the hashtag in parameter
// Response: result, tweets (tweets sorted by date from more recent)
router.get('/hashtag/:hashtag', async (req, res) => {
    const tweets = await Tweet.find({ hashtags: { $in: req.params.hashtag } });
    tweets[0] ?
        res.json({ result: true, tweets }) :
        res.json({ result: false, error: 'No tweet for this hashtag' });
});

// GET: Find the 10 first hashtags with the more tweets
// Response: result, length, hashtags (hashtags sorted by popularity)
router.get('/trends', (req, res) => {
    res.json({});
});

module.exports = router;