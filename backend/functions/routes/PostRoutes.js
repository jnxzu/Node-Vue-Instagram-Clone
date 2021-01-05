const router = require('express').Router();
const { newPost, flagPost, likeSwitch, timeline } = require('../services/PostServices');

const rejectMethod = (_req, res) => {
  res.sendStatus(405);
};

// NEW POST
router.route('/new').post(newPost).all(rejectMethod);

// REPORT/APPROVE POST
router.route('/post/:id/flag').patch(flagPost).all(rejectMethod);

// LIKE/UNLIKE
router.route('/post/:id').patch(likeSwitch).all(rejectMethod);

// DASHBOARD
router.route('/timeline').get(timeline).all(rejectMethod);

module.exports = router;
