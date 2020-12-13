const functions = require('firebase-functions');
require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session');
const errorHandler = require('error-handler');
const logger = require('morgan');
const axios = require('axios');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const mongoose = require('./mongoose');
const passport = require('./passport');
// const server = require('./https')(app);
const port = process.env.PORT;
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
const users = require('./routes/UserRoutes');
app.use('/UserRoutes', users);

// Wyłapujemy odwołania do nieobsługiwanych adresów
app.use((_, res) => {
  res.sendStatus(404);
});

const axiosConfig = {
  withCredentials: true,
};

axios.config = axiosConfig;

app.get('/jebacpis', (req, res) => res.send('***** ***'));

// Zostawiam dla testów poza Firebase
//server.listen(port, () => {
//  console.log(`Serwer działa pod adresem: https://localhost:${port}`);
//});

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.api = functions.region('europe-west1').https.onRequest(app);
