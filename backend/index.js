require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const cors = require('cors');
const session = require('express-session');
const errorHandler = require('error-handler');
const logger = require('morgan');
const axios = require('axios');
const MongoStore = require('connect-mongo')(session);

const path = require('path');
const { Console } = require('console');

const socketio = require('socket.io');
const passportSocketIo = require('passport.socketio');

const mongoose = require('./mongoose');
const passport = require('./passport');
const server = require('./https')(app);

const port = process.env.PORT;
//const Post = require('./models/Post');
const users = require('./routes/UserRoutes');
//const AuctionRoutes = require('./routes/PostRoutes');
//const messageRoutes = require('./routes/MessageRoutes');
//const postServices = require('./services/PostServices');
//const roomRoutes = require('./routes/RoomRoutes');
const MongoClient = require('mongodb').MongoClient;

app.use(express.json());

app.use(cors({ credentials: true, origin: 'http://localhost:8080' }));

app.use(cookieParser());

// Atlas connection
const uri = process.env.DATABASE_URL;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("camradb").collection("users");
  client.close();
});

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
//app.use('/api/auctions', AuctionRoutes);
//app.use('/api/messages', messageRoutes);
//app.use('/api/rooms', roomRoutes);

// Wyłapujemy odwołania do nieobsługiwanych adresów
app.use((_, res) => {
  res.sendStatus(404);
});

const axiosConfig = {
  withCredentials: true,
};

axios.config = axiosConfig;

server.listen(port, () => {
  console.log(`Serwer działa pod adresem: https://localhost:${port}`);
});
