require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const {Storage} = require('@google-cloud/storage');
const app = express();
const cors = require('cors');
const session = require('express-session');
const errorHandler = require('error-handler');
const logger = require('morgan');
const axios = require('axios');
const MongoStore = require('connect-mongo')(session);
const firebase = require('firebase');
const fs = require('fs');
const path = require('path');
const { Console } = require('console');

//  const socketio = require('socket.io');
//  const passportSocketIo = require('passport.socketio');

const mongoose = require('./mongoose');
const passport = require('./passport');
const server = require('./https')(app);

const port = process.env.PORT;
// const Post = require('./models/Post');
const users = require('./routes/UserRoutes');
//const posts = require('./routes/PostRoutes');
const { rootCertificates } = require('tls');
// const messageRoutes = require('./routes/MessageRoutes');
// const postServices = require('./services/PostServices');
// const roomRoutes = require('./routes/RoomRoutes');
//  const { MongoClient } = require('mongodb');

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

// Poziom Logowania
if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
  app.use(errorHandler);
} else {
  app.use(logger('short'));
}

// Publiczny folder

app.use(express.static(path.join(__dirname, 'client/dist')));

// Routing
app.use('/UserRoutes', users);
//app.use('/PostRoutes', posts);
// app.use('/api/auctions', AuctionRoutes);
// app.use('/api/messages', messageRoutes);
// app.use('/api/rooms', roomRoutes);

// Wyłapujemy odwołania do nieobsługiwanych adresów
app.use((_, res) => {
  res.sendStatus(404);
});

const axiosConfig = {
  withCredentials: true,
};

axios.config = axiosConfig;

var firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  databaseURL: process.env.FB_DATABASE_URL,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MSG_SENDER_ID,
  appId: process.env.FB_APP_ID
};

// https://cloud.google.com/appengine/docs/standard/nodejs/using-cloud-storage
firebase.initializeApp(firebaseConfig);
const storage = new Storage({
  keyFilename: "fb-key-file.json",
});
let bucketName = process.env.FB_STORAGE_BUCKET;
const downloadFile = async(filename) => {
  await storage.bucket(bucketName).file(filename).createReadStream().on('error', function(err) {})
  .on('response', function(response) {
    // Server connected and responded with the specified status and headers.
   })
  .on('end', function() {
    // The file is fully downloaded.
  })
  .pipe(fs.createWriteStream(filename));;
}
downloadFile('maskonur2.png');

server.listen(port, () => {
  console.log(`Serwer działa pod adresem: https://localhost:${port}`);
});
