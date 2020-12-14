const router = require('express').Router();
const postservices = require('../services/PostServices');

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

router.route('/startpost').patch(isAuth, postservices.startPost).all(rejectMethod);

router
  .route('/post')
  .post(isAuth, postservices.newPost)
  .patch(isAuth, postservices.patchPost)
  .delete(isAuth, postservices.deletePost)
  .all(rejectMethod);

router.route('/page/:page').get(postservices.postsPage).all(rejectMethod);

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
  .all(rejectMethod);

module.exports = router;
