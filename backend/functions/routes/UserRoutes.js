const express = require('express');

const router = express.Router();
// const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');

// LOGIN
router.post('/login', passport.authenticate('local'), (req, res) => {
  return res.json(req.user);
});

// REGISTER
router.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  User.findOne({ username }).then((userByUsername) => {
    if (userByUsername) {
      return res.status(400).json({
        msg: 'Username already exists',
      });
    }

    return User.findOne({ email }).then((userByEmail) => {
      if (userByEmail) {
        return res.status(400).json({
          msg: 'Email already exists',
        });
      }

      // const hashedPw = bcrypt.genSalt(10, (_, salt) => {
      //   bcrypt.hash(password, salt, (err, hash) => {
      //     if (err) throw err;
      //     return hash;
      //   });
      // });

      const newUser = new User();
      newUser.username = username;
      newUser.email = email;
      newUser.isAdmin = false;
      newUser.password = newUser.generateHash(password);

      newUser.save().then(() => {
        return res.status(201).json({
          success: true,
        });
      });

      return res.status(500);
    });
  });
});

// LOGOUT
router.get('/logout', (req, res) => {
  if (req.session.passport === undefined) res.status(401).json({ msg: 'Unauthorized' });
  else {
    req.logOut();
    req.session.destroy((err) => {
      if (err) return res.status(500);
      return res.json({ loggedOut: true });
    });
  }
});

module.exports = router;
