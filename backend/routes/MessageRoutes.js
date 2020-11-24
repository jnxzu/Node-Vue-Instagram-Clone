/* eslint-disable consistent-return */
const router = require('express').Router();
const messageservices = require('../services/MessageServices');
// Uwierzytelnianie

// Wyłapywanie odwołań nieobsługiwanymi metodami HTTP
const rejectMethod = (_req, res) => {
  // Method Not Allowed
  res.sendStatus(405);
};

const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(403).json({
    message: 'Not authenticated',
  });
};

router.route('/new').post(isAuth, messageservices.newMessage).all(rejectMethod);

router.route('/inbox').get(isAuth, messageservices.inbox).all(rejectMethod);

router.route('/room').post(isAuth, messageservices.findRoomsMessages).all(rejectMethod);

module.exports = router;
