const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const User = require('../models/users');

const saltRounds = 12;

router.post('/sign-up', async (req, res) => {//tested and works
  try {
    const userInDatabase = await User.findOne({ username: req.body.username });
    const emailInDatabase = await User.findOne({email: req.body.email})

    if (!emailRegex.test(req.body.email)){ //checking to see if in correct email format
      return res.status(409).json({err:'please enter a valid email' })
    }
    if (userInDatabase) {
      return res.status(409).json({err: 'Username already taken.'});
    }
    if (emailInDatabase){
      return res.status(409).json({err:'email already associated with an account'})
    }

    const user = await User.create({
      username: req.body.username,
      hashedPassword: bcrypt.hashSync(req.body.password, saltRounds),
      email: req.body.email,
     posts: [] //blank list for now
    });
    console.log('Account created', user)

    const payload = { username: user.username, _id: user._id };

    const token = jwt.sign({ payload }, process.env.JWT_SECRET);

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.post('/sign-in', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json({ err: 'Invalid credentials.' });
    }

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password, user.hashedPassword
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({ err: 'Invalid credentials.' });
    }

    const payload = { username: user.username, _id: user._id };

    const token = jwt.sign({ payload }, process.env.JWT_SECRET);

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
