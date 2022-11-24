const express = require('express');
const router = express.Router();

const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');

// POST: allow to create a new user to DB
// Response: result, token
router.post('/signup', async (req, res) => {
  if (checkBody(req.body, ['firstname', 'username', 'password'])) {
    const { firstname, username, password } = req.body;
    const foundUser = await User.findOne({ username });

    if (foundUser) res.json({ result: false, error: 'User already exists' });
    else {
      const newUser = new User({
        firstname,
        username,
        password: bcrypt.hashSync(password, 10),
        token: uid2(32),
      });

      try {
        const savedUser = await newUser.save();
        savedUser ?
          res.json({ result: true, token: savedUser.token }) :
          res.json({ result: false });
      } catch (error) {
        res.json({ result: false, error });
      }
    }
  } else res.json({ result: false, error: 'Missing or empty fields' });
});

// POST: allow to find a new user to DB
// Response: result, token
router.post('/signin', async (req, res) => {
  if (checkBody(req.body, ['username', 'password'])) {
    const { username, password } = req.body;
    const foundUser = await User.findOne({ username });

    if (foundUser && bcrypt.compareSync(password, foundUser.password)) {
      res.json({ result: true, token: foundUser.token });
    } else {
      res.json({ result: false, error: 'User not found or wrong password' });
    }
  } else res.json({ result: false, error: 'Missing or empty fields' });
});

// GET: allow to verify token in parameter
// Response: result
router.get('/:token', async (req, res) => {
  const foundUser = await User.findOne({ token: req.params.token });
  
  if (foundUser) res.json({ result: true });
  else res.json({ result: false, error: 'User not found'});
});

module.exports = router;
