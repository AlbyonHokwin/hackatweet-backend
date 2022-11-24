const express = require('express');
const router = express.Router();
const Tweet = require('../models/tweets');

// POST: allow to create a new message to DB
// Response: result
router.post('/new', (req, res) => {
    res.json({});
  });

// DELETE: allow to delete a message from DB
// Response: result
router.delete('/delete', (req, res) => {
    res.json({});
});

// GET: take the last 20 tweets
// Response: result, tweets (tweets sorted by date from more recent)
router.get('/lasts', (req, res) => {
    res.json({});
});

// GET: Find tweets with the hashtag in parameter
// Response: result, tweets (tweets sorted by date from more recent)
router.get('/:hashtag', (req, res) => {
    res.json({});
});

// GET: Find the 10 first hashtags with the more tweets
// Response: result, length, hashtags (hashtags sorted by popularity)
router.get('/trends', (req, res) => {
    res.json({});
});
  
module.export = router;