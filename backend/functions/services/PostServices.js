const { Storage } = require('@google-cloud/storage');
const Post = require('../models/Post');
const User = require('../models/User');

module.exports.newPost = (req, res) => {
  const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT_ID,
    keyFilename: process.env.GCLOUD_APPLICATION_CREDENTIALS,
  });
  const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET_URL);

  const { poster, desc } = req.body;
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
    const newPost = new Post();
    newPost.poster = poster;
    newPost.description = desc;
    newPost.imageUrl = publicUrl;
    newPost.isReported = false;
    newPost.likes = [];
    newPost.comments = [];
    newPost.date = new Date();

    newPost.save().then((post) => {
      User.findByIdAndUpdate(poster, { $push: { posts: post._id } }).then(() => {
        return res.status(201).json(post);
      });
    });
  });

  blobWriter.end(buffer);
};

module.exports.flagPost = (req, res) => {
  const { id } = req.params;
  const { reported } = req.body;
  if (reported) {
    Post.findByIdAndUpdate(id, { isReported: false }).then(() => {
      return res.status(200).json('Post approved.');
    });
  } else {
    Post.findByIdAndUpdate(id, { isReported: true }).then(() => {
      return res.status(200).json('Post reported.');
    });
  }
};

module.exports.getPost = (req, res) => {
  const { id } = req.params;
  Post.findById(id)
    .populate('poster')
    .populate('comments.author')
    .then((post) => {
      if (post) return res.status(200).json(post);
      return res.status(404).json({
        msg: 'Post not found',
      });
    });
};

module.exports.likeSwitch = (req, res) => {
  const postId = req.params.id;
  const { userId, liked } = req.body;
  if (liked) {
    Post.findByIdAndUpdate(postId, { $pull: { likes: userId } }).then(() => {
      return res.status(200).json('Like removed.');
    });
  } else {
    Post.findByIdAndUpdate(postId, { $push: { likes: userId } }).then(() => {
      return res.status(200).json('Like added');
    });
  }
};

module.exports.timeline = (req, res) => {
  const { userId, currentPage } = req.query;

  const options = {
    populate: ['poster', 'likes', 'comments.author'],
    page: currentPage,
    limit: 5,
    sort: { date: -1 },
  };

  if (userId) {
    User.find({ followers: userId }).then((users) => {
      const followedUsers = users.map((u) => u._id);
      followedUsers.push(userId);
      Post.paginate({ poster: { $in: followedUsers } }, options, (_, result) => {
        return res.status(200).json({ docs: result.docs, np: result.hasNextPage });
      });
    });
  } else {
    Post.paginate({}, options, (_, result) => {
      return res.status(200).json({ docs: result.docs, np: result.hasNextPage });
    });
  }
};

module.exports.addComment = (req, res) => {
  const { id } = req.params;
  const { userId, content } = req.body;
  const newComm = {
    author: userId,
    content,
    date: new Date(),
  };
  Post.findByIdAndUpdate(id, { $push: { comments: newComm } }).then(() => {
    return res.status(200).json('Comment added.');
  });
};

module.exports.admin = (_, res) => {
  Post.find({ isReported: true }).then((posts) => {
    return res.status(200).json(posts);
  });
};

module.exports.deletePost = (req, res) => {
  const { id } = req.params;
  Post.findByIdAndDelete(id).then(() => {
    return res.status(200).json('Post deleted.');
  });
};
