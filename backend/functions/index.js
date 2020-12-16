const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');

const cookieParser = require('cookie-parser');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

require('dotenv').config();

const mongoose = require('./mongoose');
const passport = require('./passport');

const app = express();

app.use(express.json());
app.use(cors({ origin: true })); // DEV
// app.use(cors({ origin: new RegExp(/.*\/\/camra-4feb8.web.app\/.*/) })); // PROD
app.use(cookieParser());

const sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection,
  collection: 'sessions',
});

app.use(
  session({
    secret: process.env.APP_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const users = require('./routes/UserRoutes');

app.use('/UserRoutes', users);

app.use((_, res) => {
  res.sendStatus(404);
});

// const axiosConfig = {
//   withCredentials: true,
// };

// axios.config = axiosConfig;

exports.api = functions.region('europe-west1').https.onRequest(app);
