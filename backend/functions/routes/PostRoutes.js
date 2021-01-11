const router = require('express').Router();
const {
  newPost,
  flagPost,
  likeSwitch,
  timeline,
  getPost,
  addComment,
  admin,
  deletePost,
} = require('../services/PostServices');

const rejectMethod = (_req, res) => {
  res.sendStatus(405);
};

// NEW POST
router.route('/post').post(newPost).all(rejectMethod);

// GET = GET POST BY ID
// PATCH = LIKE TOGGLE
router.route('/post/:id').get(getPost).patch(likeSwitch).all(rejectMethod);

// REPORT/APPROVE POST
router.route('/post/:id/flag').patch(flagPost).all(rejectMethod);

// DELETE POST
router.route('/delete/:id').delete(deletePost).all(rejectMethod);

// DASHBOARD
router.route('/timeline').get(timeline).all(rejectMethod);

// ADMIN
router.route('/admin').get(admin).all(rejectMethod);

// ADD COMMENT
router.route('/post/:id/comment').post(addComment).all(rejectMethod);

module.exports = router;
