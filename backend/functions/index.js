/* eslint-disable no-console */
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const fileParser = require('express-multipart-file-parser');

const cookieParser = require('cookie-parser');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

require('dotenv').config();

const socketio = require("socket.io");

const mongoose = require('./mongoose');
const passport = require('./passport');

const app = express();

app.use(express.json());
app.use(fileParser);

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

const userRoutes = require('./routes/UserRoutes');
const postRoutes = require('./routes/PostRoutes');
const chatRoutes = require('./routes/ChatRoutes');

app.use(userRoutes);
app.use(postRoutes);
app.use(chatRoutes);

app.use((_, res) => {
  res.sendStatus(404);
});

// I HAVE NO IDEA WHAT IM DOING H E L P 
// const passportSocketIo = require("passport.socketio");
const io = socketio(app);

io.set('transports', ['websocket']);

io.on("connection", (socket) => {
    console.log(`Made socket connection: ${socket.id}`);
    const {username} = socket.request.user;

    socket.on("leaveUser", (data) => {
        if (socket.request.user.logged_in) {
            console.dir(`User: "${username}" has left room { ${data._id} } (self)`);
            socket.leave(data._id);
        }
    });

    socket.on("joinConvo", (data) => {
        if (socket.request.user.logged_in) {
            console.log(`User: "${username}" joined conversation room ${  data._id}`);
            socket.join(data._id);
        }
    });

    socket.on("chatMessage",(data) => {
        const obj = {
            sender: data.sender,
            content: data.content,
            date: data.date
        };
        io.sockets.in(data._id).emit("chatMessage", obj);
    })
    socket.on("start", (data) => {
        if (socket.request.user.logged_in) {
          console.log(`Socket ${data._id} starting`);
        }
    });
    socket.on('leave', (data) => {
        console.log(`Socket ${data._id} disconnecting`);
        socket.leave(data._id);
        socket.disconnect();
    });
});


// const axiosConfig = {
//   withCredentials: true,
// };

// axios.config = axiosConfig;

exports.api = functions.region('europe-west1').https.onRequest(app);
