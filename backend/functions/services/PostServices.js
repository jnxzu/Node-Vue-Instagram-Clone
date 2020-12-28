/* eslint-disable func-names */
/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const Post = require('../models/Post');
const User = require('../models/User')

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
      return next();
  }
  res.status(403).json({
      message: "Not authenticated"
  });
};


module.exports.newPost = (req, res) => {
  const { description } = req.body;
  const {user} = req.session.passport;
  const newPost = new Post();
  newPost.poster = user;
  newPost.description = description;
  // INSERT IMAGE UPLOAD HERE
  newPost.imageUrl = "xxx";
  newPost.isReported = false;
  newPost.likes = [];
  newPost.comments = [];
  newPost.date = Date.now();
  newPost.save().then(() => {
    return res.status(201).json(newPost);
  });
}

module.exports.deletePost = (req, res) => {
  const {id} = req.params;
  Post.findByIdAndDelete({_id: id}, function(err) {
    if (err) return res.json(err);
    return res.json({
      msg: "Deleted"
    });
  });
}

module.exports.reportPost = (req, res) => {
  const {id} = req.params;
  Post.findById({ _id: id }).then((p) => {
    if (p) {
      const p1 = p;
      if (p1.isReported === false) p1.isReported = true;
      Post.findByIdAndUpdate(p._id, p1, (err) => {
        if (err) return res.status(500).json({
          msg: "error"
        });
        return res.status(418).json({
          msg: "done"
        });
      });
    } else return res.status(500).json({
      msg: "Could not report post."
    });
  });
}

module.exports.likeSwitch = (req, res) => {
  if (req.session.passport === undefined) res.status(401).json({ msg: 'Unauthorized' });
  else {
    const {id} = req.params;
    const {user} = req.session.passport;
    User.findById({ _id: user }).then((u) => {
      if (u) {
        Post.findById({ _id: id }).then((p) => {
          if (p) {
            const p1 = p;
            const i1 = p1.likes.indexOf(u._id);
            if (i1 > -1) {
              p1.likes.splice(i1, 1);
            } else {
              p1.likes.push(u._id);
            }
            Post.findByIdAndUpdate(p._id, p1, (err) => {
              if (err) return res.status(500).json({
                msg: "error"
              });
              return res.status(418).json({
                msg: "Thanks, we will look into this."
              });
            });
          } else {
            return res.status(404).json({
              msg: "Post not found"
            });
          }
        });
      } else {
        return res.status(400).json({
          msg: "Please log in."
        });
      }
    });
  }
}

module.exports.dashboard = (isAuthenticated, async (req, res) => {
    const page = parseInt(req.params.page, 10);
    const aggregateOptions = [];
    const limit = 10;
    const options = {
      page,
      limit,
    };
    aggregateOptions.push();
    const myAggregate = Post.aggregate(aggregateOptions);
    const result = await Post.aggregatePaginate(myAggregate, options);
    res.status(200).json(result);
});

module.exports.mypostsPage = (isAuthenticated, async (req, res) => {
    const page = parseInt(req.params.page, 10);
    const aggregateOptions = [];
    const limit = 10;
    const options = {
      page,
      limit,
    };
    const match = {
      $or: { poster: req.user.username },
    };
    aggregateOptions.push({ $match: match });
    const myAggregate = Post.aggregate(aggregateOptions);
    const result = await Post.aggregatePaginate(myAggregate, options);
    res.status(200).json(result);
  });

module.exports.mylikesPage = (isAuthenticated, async (req, res) => {
    const page = parseInt(req.params.page, 10);
    const aggregateOptions = [];

    const limit = 3;
    const options = {
      page,
      limit,
    };

    const match = {
      $or: [{ likes: req.user.username }],
    };
    aggregateOptions.push({ $match: match });
    const myAggregate = Post.aggregate(aggregateOptions);
    const result = await Post.aggregatePaginate(myAggregate, options);
    res.status(200).json(result);
});
