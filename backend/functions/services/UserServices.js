const User = require('../models/User.js');

module.exports.login = (req, res) => {
  return res.json({
    currentUserId: req.user._id,
    currentUserName: req.user.username,
    isAdmin: req.user.isAdmin,
  });
};

module.exports.register = (req, res) => {
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
      newUser.bio = '';
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
};

module.exports.profile = (req, res) => {
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
};

module.exports.followSwitch = (req, res) => {
  const { sender, alreadyFollowing } = req.body;
  const target = req.params.username;
  if (alreadyFollowing) {
    User.findByIdAndUpdate(sender, { $pull: { following: target } }).then(() =>
      User.findByIdAndUpdate(target, { $pull: { followers: sender } }).then(() => res.status(200))
    );
  } else {
    User.findByIdAndUpdate(sender, { $push: { following: target } }).then(() =>
      User.findByIdAndUpdate(target, { $pull: { followers: sender } }).then(() => res.status(200))
    );
  }
};

module.exports.search = (req, res) => {
  const { phrase } = req.body;
  User.find({ username: { $regex: phrase, $options: 'i' } })
    .limit(5)
    .then((results) => {
      return res.json(results.map((r) => r.username));
    });
};
