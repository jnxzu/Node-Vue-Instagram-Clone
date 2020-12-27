const router = require('express').Router();
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

// DASHBOARD
router.route('/dashboard').get(isAuth, postservices.dashboard).all(rejectMethod);

// MY POSTS 
router.route('/my-posts').get(isAuth, postservices.myPosts).all(rejectMethod);

// MY LIKES 
router.route('/my-likes').get(isAuth, postservices.myLikes).all(rejectMethod);

module.exports = router;
