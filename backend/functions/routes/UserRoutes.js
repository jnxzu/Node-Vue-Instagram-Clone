/* eslint-disable no-param-reassign */
const express = require('express');

const router = express.Router();
// const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');
require('../models/Post');

// LOGIN
router.post('/login', passport.authenticate('local'), (req, res) => {
  return res.status(200).json({
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
      return res.status(200).json({ loggedOut: true });
    });
  }
});

// PROFILE
router.get('/profile/:username', (req, res) => {
  const { username } = req.params;
  User.findOne({ username })
    .populate([
      { path: 'posts', model: 'Post' },
      { path: 'followers', model: 'User' },
      { path: 'following', model: 'User' },
    ])
    .then((userByUsername) => {
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
router.patch('/follow', (req, res) => {
  const { me, target } = req.body;
  User.findOne({ username: me })
    .then((myAccount) => {
      User.findOne({ username: target })
        .then((targetAccount) => {
          const ret = { new: myAccount };
          if (myAccount.following.includes(targetAccount._id)) {
            const myIndex = targetAccount.followers.indexOf(myAccount._id);
            const targetIndex = myAccount.following.indexOf(targetAccount._id);
            targetAccount.followers.splice(myIndex, 1);
            myAccount.following.splice(targetIndex, 1);
            ret.add = false;
          } else {
            myAccount.following.push(targetAccount._id);
            targetAccount.followers.push(myAccount._id);
            ret.add = true;
          }
          myAccount.save().then(() => targetAccount.save().then(() => res.status(200).json(ret)));
        })
        .catch(() => res.status(500));
    })
    .catch(() => res.status(500));
});

// USER SEARCH
router.post('/search', (req, res) => {
  const { phrase } = req.body;
  User.find({ username: { $regex: phrase, $options: 'i' } })
    .limit(5)
    .then((results) => {
      return res.json(results.map((r) => ({ username: r.username, avatar: r.avatarUrl })));
    });
});

module.exports = router;
