/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
const router = require('express').Router();
const passport = require('passport');
const Post = require('../models/Post');
const User = require('../models/User');
const postservices = require('../services/PostServices');

// Wyłapywanie odwołań nieobsługiwanymi metodami HTTP
const rejectMethod = (_req, res) => {
  // Method Not Allowed
  res.sendStatus(405);
};

// eslint-disable-next-line consistent-return
const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(403).json({
    message: 'Not authenticated',
  });
};

// NEW POST
router.route('/new').post(isAuth, postservices.newPost).all(rejectMethod);

// DELETE POST
router.route('/post/:id').delete(isAuth, postservices.deletePost).all(rejectMethod);

// REPORT POST
router.route('/post/:id/report').patch(isAuth, postservices.reportPost).all(rejectMethod);

// LIKE/UNLIKE
router.route('/post/:id').patch(isAuth, postservices.likeSwitch).all(rejectMethod);

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
  .all(rejectMethod); */

/* router.route('/page/:page').get(postservices.postsPage).all(rejectMethod);

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
  .all(rejectMethod); */

module.exports = router;
