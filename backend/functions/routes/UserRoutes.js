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
      newUser.posts = [];
      newUser.following = [];
      newUser.followers = [];
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

// PROFILE
router.get('/profile/:username', (req, res) => {
  const { username } = req.params;
  User.findOne({ username }).then((userByUsername) => {
    if (userByUsername) {
      return res.status(200).json({
        bio: userByUsername.bio,
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

// FOLLOW/UNFOLLOW
router.patch('/profile/:username/f', (req, res) => {
  if (req.session.passport === undefined) res.status(401).json({ msg: 'Unauthorized' });
  else {
    var username2 = req.params.username;
    var username1 = req.session.passport.user;
    User.findOne({ _id: username1 }).then((userByUsername1) => {
      if (userByUsername1) {
        User.findOne({ username: username2 }).then((userByUsername2) => {
          if (userByUsername2) {
            var n1 = userByUsername1;
            var n2 = userByUsername2;
            var i1 = n1.following.indexOf(userByUsername2._id);
            var i2 = n2.followers.indexOf(userByUsername1._id);
            if (i1 > -1 && i2 > -1) {
              n1.following.splice(i1, 1);
              n2.followers.splice(i2, 1);
            }
            if (i1 == -1 && i2 == -1) {
              n1.following.push(userByUsername2._id);
              n2.followers.push(userByUsername1._id);
            }
            User.findByIdAndUpdate(userByUsername1._id, n1, (err, userByUsername1) => {
              if (err) res.statusCode(500);
              else {
                User.findByIdAndUpdate(userByUsername2._id, n2, (err, userByUsername2) => {
                  if (err) res.statusCode(500);
                  else return res.json(userByUsername2.followers);
                });
              }
            });
          }
          else {
            return res.status(404).json({
              msg: "User not found."
            });
          }
        });
      }
      else {
        return res.status(400).json({
          msg: "Please log in."
        });
      }
    });
  }
});

// USER SEARCH
router.post('/search', (req, res) => {
  const { phrase } = req.body;
  User.find({ username: {$regex: phrase, $options: 'i'} }).limit(5).then((results) => {
    return res.json(results.map(r => r.username));
  });
});


module.exports = router;
