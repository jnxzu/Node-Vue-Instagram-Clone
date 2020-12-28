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
app.use(cors({ origin: '*' })); // DEV
// app.use(cors({ origin: new RegExp(/.*\/\/camra-4feb8.web.app\/.*/) }));  // PROD
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

const userRoutes = require('./routes/UserRoutes');
const postRoutes = require('./routes/PostRoutes');
const chatRoutes = require('./routes/ChatRoutes')

app.use('/UserRoutes', userRoutes);
app.use('/PostRoutes', postRoutes);
app.use('/ChatRoutes', chatRoutes);

app.use((_, res) => {
  res.sendStatus(404);
});

// const axiosConfig = {
//   withCredentials: true,
// };

// axios.config = axiosConfig;

exports.api = functions.region('europe-west1').https.onRequest(app);
