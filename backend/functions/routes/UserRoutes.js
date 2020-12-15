const express = require('express');

const router = express.Router();
// const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');

// LOGIN
router.post('/login', passport.authenticate('local'), (req, res) => {
  return res.json({
    currentUserId: req.user._id,
    currentUserName: req.user.username,
    isAdmin: req.user.isAdmin,
  });
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
      newUser.avatarUrl = '';
      newUser.generateHash(password).then(function assignHash(hash) {
        newUser.password = hash;
      });

      newUser.save().then(() => {
        return res.status(201).json({
          currentUserId: newUser._id,
          currentUserName: newUser.username,
          isAdmin: newUser.isAdmin,
        });
      });

      return res.status(500);
    });
  });
});

// LOGOUT
// router.get('/logout', (req, res) => {
//   if (req.session.passport === undefined) res.status(401).json({ msg: 'Unauthorized' });
//   else {
//     req.logOut();
//     req.session.destroy((err) => {
//       if (err) return res.status(500);
//       return res.json({ loggedOut: true });
//     });
//   }
// });

// PROFILE
router.get('/profile/:username', (req, res) => {
  const { username } = req.params;
  User.findOne({ username }).then((userByUsername) => {
    if (userByUsername) {
      return res.status(200).json({
        username: userByUsername.username,
        avatarUrl: userByUsername.avatarUrl,
        posts: userByUsername.posts,
        followers: userByUsername.followers,
        following: userByUsername.following,
      });
    }
    return res.status(404).json({
      msg: 'User with this username does not exist.',
    });
  });
});

module.exports = router;
