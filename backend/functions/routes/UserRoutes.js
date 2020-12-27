/* eslint-disable consistent-return */
const express = require('express');

const router = express.Router();
// const bcrypt = require('bcryptjs');
const passport = require('passport');
const userServices = require('../services/UserServices')

// Wyłapywanie odwołań nieobsługiwanymi metodami HTTP
const rejectMethod = (_req, res) => {
  // Method Not Allowed
  res.sendStatus(405);
};

// LOGIN
router.route('/login').post(passport.authenticate('local'), userServices.login).all(rejectMethod);

// REGISTER
router.route('/register').post(userServices.register).all(rejectMethod);

// LOGOUT
router.route('/logout').get(userServices.logout).all(rejectMethod);

// PROFILE
router.route('/profile/:username').get(userServices.logout).all(rejectMethod);

// FOLLOW/UNFOLLOW
router.route('/profile/:username/f').get(userServices.follow).all(rejectMethod);

// USER SEARCH
router.route('/search').post(userServices.search).all(rejectMethod);

module.exports = router;
