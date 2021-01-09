/* eslint-disable no-console */
const { Storage } = require('@google-cloud/storage');
const User = require('../models/User.js');

module.exports.login = (req, res) => {
  return res.json({
    currentUserId: req.user._id,
    currentUserName: req.user.username,
    isAdmin: req.user.isAdmin,
    avatar: req.user.avatarUrl,
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
          id: userByUsername._id,
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
  const target = req.params.id;
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
      return res.json(results);
    });
};

module.exports.editBio = (req, res) => {
  const user = req.params.id;
  const { newBio } = req.body;
  User.findByIdAndUpdate(user, { bio: newBio }).then((u) => {
    return res.status(200).json(u);
  });
};

module.exports.changeAvatar = (req, res) => {
  const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT_ID,
    keyFilename: process.env.GCLOUD_APPLICATION_CREDENTIALS,
  });
  const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET_URL);

  const poster = req.params.id;
  const { originalname, mimetype, buffer } = req.files[0];

  const blob = bucket.file(originalname);
  const blobWriter = blob.createWriteStream({
    metadata: {
      contentType: mimetype,
    },
  });

  blobWriter.on('finish', () => {
    const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURI(
      blob.name
    )}?alt=media`;
    User.findByIdAndUpdate(poster, { avatarUrl: publicUrl }).then(() => {
      return res.status(201).json(publicUrl);
    });
  });

  blobWriter.end(buffer);
};
