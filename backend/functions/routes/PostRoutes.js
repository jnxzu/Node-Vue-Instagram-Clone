const router = require('express').Router();
const { newPost, flagPost, likeSwitch, timeline, getPost, addComment, removeComment } = require('../services/PostServices');

const rejectMethod = (_req, res) => {
  res.sendStatus(405);
};

// NEW POST
router.route('/post').post(newPost).all(rejectMethod);

// GET POST by id
router.route('/post/:id').get(getPost).all(rejectMethod);

// REPORT/APPROVE POST
router.route('/post/:id/flag').patch(flagPost).all(rejectMethod);

// LIKE/UNLIKE
router.route('/post/:id').patch(likeSwitch).all(rejectMethod);

// DASHBOARD
router.route('/timeline').get(timeline).all(rejectMethod);

// ADD COMMENT
router.route('/post/:id/comment').patch(addComment).all(rejectMethod);

// DELETE COMMENT
router.route('/post/:id/comment/:commentId').patch(removeComment).all(rejectMethod);

module.exports = router;
