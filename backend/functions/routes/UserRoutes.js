const router = require('express').Router();
const passport = require('passport');
const { login, register, profile, followSwitch, search, editBio, changeAvatar } = require('../services/UserServices');

const rejectMethod = (_req, res) => {
  res.sendStatus(405);
};

// LOGIN
router.route('/login').post(passport.authenticate('local'), login).all(rejectMethod);

// REGISTER
router.route('/register').post(register).all(rejectMethod);

// PROFILE
router.route('/profile/:username').get(profile).all(rejectMethod);

// FOLLOW/UNFOLLOW
router.route('/profile/:username/f').patch(followSwitch).all(rejectMethod);

// USER SEARCH
router.route('/search').post(search).all(rejectMethod);

// EDIT BIO
router.route('/profile/:username/editBio').patch(editBio).all(rejectMethod);

// CHANGE AVATAR
router.route('/profile/:username/changeAvatar').patch(changeAvatar).all(rejectMethod);

module.exports = router;
