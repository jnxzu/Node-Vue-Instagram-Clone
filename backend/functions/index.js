const functions = require('firebase-functions');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session');
// const errorHandler = require('error-handler');
// const logger = require('morgan');
const axios = require('axios');
const MongoStore = require('connect-mongo')(session);
// const path = require('path');
const mongoose = require('./mongoose');
const passport = require('./passport');
// const server = require('./https')(app);

const app = express();

const userRoutes = require('./routes/UserRoutes');
const roomRoutes = require('./routes/RoomRoutes');
const messageRoutes = require('./routes/MessageRoutes');
const postRoutes = require('./routes/PostRoutes');

require('dotenv').config();
// const port = process.env.PORT;

app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:8080' }));
app.use(cookieParser());

// Session store
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

// Inicjalizacja sesji
app.use(passport.initialize());
app.use(passport.session());

// Publiczny folder
// Zakomentowane, bo nie wiem czy potrzebne (w projektach to było na widoki Vue wygenerowane, teraz frontend mamy inaczej)
// app.use(express.static(path.join(__dirname, 'client/dist')));

// Routing
app.use('/api/routes', userRoutes);
app.use('/api/auctions', postRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/rooms', roomRoutes);

// Wyłapujemy odwołania do nieobsługiwanych adresów
app.use((_, res) => {
  res.sendStatus(404);
});

const axiosConfig = {
  withCredentials: true,
};

axios.config = axiosConfig;

app.get('/jebacpis', (_req, res) => res.send('***** ***'));

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.api = functions.region('europe-west1').https.onRequest(app);
