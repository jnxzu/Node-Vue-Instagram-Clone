const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const fileParser = require('express-multipart-file-parser');

const cookieParser = require('cookie-parser');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

require('dotenv').config();

const mongoose = require('./mongoose');
const passport = require('./passport');

const app = express();

app.use(cors({ origin: /camra-4feb8/ }));
// app.use(cors({ origin: true }));
app.use(cookieParser());
app.use(express.json());
app.use(fileParser);

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

const userRoutes = require('./routes/UserRoutes');
const postRoutes = require('./routes/PostRoutes');

app.use(userRoutes);
app.use(postRoutes);

app.use((_, res) => {
  res.sendStatus(404);
});

exports.api = functions.region('europe-west1').https.onRequest(app);
