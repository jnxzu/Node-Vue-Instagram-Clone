// Passport.js
const passport = require('passport');
const passportLocal = require('passport-local');
const passportHttp = require('passport-http');

// reprezentacja „użytkownika” (Mongoose)
// const model = require("../model");
const User = require('../models/User');

// Konfiguracja Passport.js
const validateUser = (username, password, done) => {
  User.findOne({ username }, async (err, user) => {
    if (user) {
      const pwValid = await user.isValidPassword(password, user.password);
      if (pwValid) {
        done(null, user);
      } else {
        done(null, null);
      }
    } else {
      done(err);
    }
  });
};

passport.use(new passportLocal.Strategy(validateUser));
passport.use(new passportHttp.BasicStrategy(validateUser));

// mówi o tym jak pamiętać user-a w sesji (tutaj poprzez _id z MongoDB)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// mówi o tym jak na podstawie danych z sesji odtworzyć user-a
passport.deserializeUser((id, done) => {
  User.findOne({ _id: id }, (err, user) => {
    if (err) {
      done(err);
    }
    if (user) {
      done(null, {
        id: user._id,
        username: user.username,
        password: user.password,
      });
    } else {
      done({
        msg: 'Nieznany ID',
      });
    }
  });
});

module.exports = passport;
