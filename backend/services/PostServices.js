const Post = require('../models/Post');

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(403).json({
    message: 'Not authenticated',
  });
};

const processErrors = (err) => {
  const msg = {};
  for (const key in err.errors) {
    msg[key] = err.errors[key].Post;
  }
  return msg;
};

// eslint-disable-next-line
const checkPosts = (req, res) => {
  const filter = {
    date: { $lte: new Date() },
    status: 'onSale',
  };
  // eslint-disable-next-line
    Post.update(filter, { "$set": { status: 'sold' } }, { "multi": true }, (err, res) => {
    if (err) {
      console.log('error updating posts');
      console.log(err);
    } else {
      console.log('posts updated!');
    }
  });
};

module.exports.postsPage =
  (isAuthenticated,
  async (req, res) => {
    const page = parseInt(req.params.page, 10);
    // hardcoded 10 because it makes sense  i guess
    const aggregateOptions = [];
    const limit = 3;
    const options = {
      page,
      limit,
    };
    // const match = {
    //   status: 'onSale',
    // };
    aggregateOptions.push();

    const myAggregate = Post.aggregate(aggregateOptions);
    const result = await Post.aggregatePaginate(myAggregate, options);
    res.status(200).json(result);
  });

module.exports.mypostsPage =
  (isAuthenticated,
  async (req, res) => {
    const page = parseInt(req.params.page, 10);

    const aggregateOptions = [];

    const limit = 3;
    const options = {
      page,
      limit,
    };

    const match = {
      $or: [{ poster: req.user.username }],
    };
    aggregateOptions.push({ $match: match });

    const myAggregate = Post.aggregate(aggregateOptions);
    const result = await Post.aggregatePaginate(myAggregate, options);
    res.status(200).json(result);
  });

module.exports.mylikesPage =
  (isAuthenticated,
  async (req, res) => {
    const page = parseInt(req.params.page, 10);
    const aggregateOptions = [];

    const limit = 3;
    const options = {
      page,
      limit,
    };

    const match = {};
    match.bidders = req.user.username;
    match.status = 'onSale';

    aggregateOptions.push({ $match: match });

    const myAggregate = Post.aggregate(aggregateOptions);
    const result = await Post.aggregatePaginate(myAggregate, options);
    res.status(200).json(result);
  });

module.exports.mysharesPage =
  (isAuthenticated,
  async (req, res) => {
    const page = parseInt(req.params.page, 10);
    const aggregateOptions = [];

    const limit = 3;
    const options = {
      page,
      limit,
    };

    const match = {
      $or: [{ shares: req.user.username }],
    };

    aggregateOptions.push({ $match: match });

    const myAggregate = Post.aggregate(aggregateOptions);
    const result = await Post.aggregatePaginate(myAggregate, options);
    res.status(200).json(result);
  });

const savePost = (post, res) => {
  Post.save((err, doc) => {
    if (err) {
      // Unprocessable Entity
      res.status(422).json(processErrors(err));
    } else {
      res.json(doc);
    }
  });
};

module.exports.create = (req, res) => {
  const post = new Post(req.body);
  savePost(post, res);
};

module.exports.read = (req, res, next) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      next(err);
    } else if (post) {
      res.json(post.bids);
    } else {
      // Not Found
      res.sendStatus(404);
    }
  });
};

module.exports.list = (req, res) => {
  Post.find((error, docs) => {
    if (error) {
      res.json(error);
    } else {
      res.json(docs);
    }
  });
};

module.exports.update = (req, res) => {
  Post.updateOne({ _id: req.body._id }, req.body, (error, doc) => {
    if (error) {
      res.status(500).json(processErrors(error));
    } else {
      res.status(201).json(doc);
    }
  });
};

module.exports.delete = (req, res, next) => {
  Post.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      return next(err);
    }
    // No Content
    res.sendStatus(204);
  });
};

module.exports.validateId = (req, res, next) => {
  const idRegExp = /^[0-9a-fA-F]{24}$/;
  if (!req.params.id.match(idRegExp)) {
    // Bad Request
    return res.sendStatus(400);
  }
  next();
};

module.exports.newPost = async (req, res) => {
  const post = new Post({
    title: req.user.title,
    caption: req.user.caption,
    url: req.user.url,
    likes: [],
    shares: [],
    date: req.user.date,
  });
  try {
    const doc = await post.save();
    res.status(201).json(doc);
  } catch (error) {
    res.status(500).json(processErrors(error));
  }
};

module.exports.patchPost = async (req, res) => {
  const { body } = req;
  console.dir(req.body);
  console.dir(req.body.id);
  Post.findById(req.body.id, (err, doc) => {
    if (err) {
      res.code(500);
    } else {
      if (body.poster === req.user.username) {
        if (body.title) {
          doc.title = body.title;
        }
        if (body.caption) {
          doc.caption = body.caption;
        }
        if (body.url || body.url === '') {
          doc.date = body.date;
        }
      }
      if (body.like) {
        doc.likes.push(body.like);
      }
      if (body.share) {
        doc.shares.push(body.share);
      }
      doc.save();
      res.json(doc);
    }
  });
};

module.exports.deletePost = (req, res) => {
  const filter = {
    _id: req.body.id,
    poster: req.user.username,
  };
  Post.findOneAndDelete(filter, (err, doc) => {
    if (err) {
      res.status(500).json(Post.processErrors(err));
    } else if (doc === null) {
      res.json({
        message: 'Error deleting post',
      });
    } else {
      res.json({
        message: 'Post successfully deleted',
      });
    }
  });
};

module.exports.processErrors = (err) => {
  const msg = {};
  for (const key in err.errors) {
    msg[key] = err.errors[key].message;
  }
  return msg;
};
