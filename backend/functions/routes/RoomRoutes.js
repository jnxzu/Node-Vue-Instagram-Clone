const router = require('express').Router();
const roomservices = require('../services/RoomServices');
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

router.route('/new').post(isAuth, roomservices.newRoom).all(rejectMethod);

router.route('/find').post(roomservices.findByTwo).all(rejectMethod);

module.exports = router;
