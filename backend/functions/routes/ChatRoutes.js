const router = require('express').Router();
const chatservices = require('../services/ChatServices');

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

router.route('/new').post(isAuth, chatservices.newMessage).all(rejectMethod);

router.route('/all').get(isAuth, chatservices.getMessages).all(rejectMethod);

module.exports = router;