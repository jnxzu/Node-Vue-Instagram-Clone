const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }).then((user) => {
    if (user) {
      return res.status(400).json({
        msg: 'Username already exists',
      });
    }
  });
  // If the data is valid
  const newUser = new User({
    username,
    password,
  });
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save().then((user) => {
        console.log(user);
        return res.status(201).json({
          success: true,
          msg: 'User registered',
        });
      });
    });
  });
});

module.exports = router;
