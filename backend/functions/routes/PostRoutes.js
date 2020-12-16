const router = require('express').Router();
const passport = require('passport');
const Post = require('../models/Post');
const postservices = require('../services/PostServices');

// NEW POST
router.post('/post', (req, res) => {
  const { description } = req.body;
  var user = req.session.passport.user;
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
});

// DELETE POST
router.delete('/post/:id', (req, res) => {
  var id = req.params.id;
  Post.findByIdAndDelete({_id: id}, function(err,docs) {
    if (err) return res.json(err);
    else return res.json({
      msg: "Deleted"
    });
  });
});
  /*
// eslint-disable-next-line consistent-return
const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(403).json({
    message: 'Not authenticated',
  });
};

const rejectMethod = (_req, res) => {
  // Method Not Allowed
  res.sendStatus(405);
};

router
  .route('/post')
  .post(isAuth, postservices.newPost);

  .patch(isAuth, postservices.patchPost)
  .delete(isAuth, postservices.deletePost)
  .all(rejectMethod);*/

/*router.route('/page/:page').get(postservices.postsPage).all(rejectMethod);

router.route('/my-posts/page/:page').get(isAuth, postservices.mypostsPage).all(rejectMethod);

router.route('/my-likes/page/:page').get(isAuth, postservices.mybidsPage).all(rejectMethod);

router.route('/my-history/page/:page').get(isAuth, postservices.myhistoryPage).all(rejectMethod);

router
  .route('/')
  .get(isAuth, postservices.list)
  .put(isAuth, postservices.update)
  .post(isAuth, postservices.create)
  .all(rejectMethod);

router
  .route('/post/:id')
  .delete(isAuth, postservices.delete)
  .get(postservices.read)
  .all(rejectMethod);*/

module.exports = router;
