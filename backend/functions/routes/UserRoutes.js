const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');

router.get('/hw', (req, res) => {
  res.send("Hello world");
});

// LOGIN
router.post('/login', passport.authenticate('local'), (req, res) => {
  return res.json(req.user);
});

// REGISTER
router.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  // eslint-disable-next-line consistent-return
  User.findOne({ username }).then((user) => {
    if (user) {
      return res.status(400).json({
        msg: 'Username already exists',
      });
    }
  });
  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(400).json({
        msg: 'Email already exists',
      });
    }
  });
  // If the data is valid
  const newUser = new User({
    username,
    email,
    password,
  });
  bcrypt.genSalt(10, (err, salt) => {
    // eslint-disable-next-line no-shadow
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

// LOGOUT
router.get('/logout', function (req, res) {
  if (req.session.passport === undefined) res.status(401).json({msg: "Unauthorized"});
  else {
  req.logOut();
  req.session.destroy(function (err) {
      if (err) return res.status(500);
      else res.json({msg: "Logged out!"});
  });
}
});

module.exports = router;
