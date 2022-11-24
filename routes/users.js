const express = require('express');
const router = express.Router();
const User = require('../models/users');

// POST: allow to create a new user to DB
// Response: result, token
router.post('/signup', (req, res) => {
  res.json({});
});

// POST: allow to find a new user to DB
// Response: result, token
router.post('/signin', (req, res) => {
  res.json({});
});

// GET: allow to verify token in parameter
// Response: result
router.get('/:token', (req, res) => {
  res.json({});
});

module.exports = router;
