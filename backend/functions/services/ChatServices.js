/* eslint-disable consistent-return */
const moment = require('moment');
const Chat = require('../models/Chat');
const User = require('../models/User');

// const {Message} = Chat

// const findChat = (req, res) => {
//   const filtr = {
//     $in: [
//       { users: req.body.user1},
//       { users: req.body.user2},
//     ],
//   };
//   Chat.find(filtr, function (err, doc) {
//     if (err) {
//       res.json(err);
//     } else {
//       res.json(doc);
//     }
//   });
// };

module.exports.newMessage = (req, res) => {
      const msg = {
        author: req.user.id,
        content: req.body.content,
        date: moment(),
      };
      User.findOne({ username: req.body.target }).then((messageTarget) => {
        Chat.findOneAndUpdate(
          {
            users: { $all: [req.user.id, messageTarget._id] },
          },
          { $push: { messages: msg } },
        ).then(() => {
          console.log(
            `${moment().format('MMMM Do YYYY, h:mm:ss a')} - ${
              req.user.username
            } sent '${msg.content}' to ${messageTarget.username}.`,
          );
          res.send({ clear: '' });
        });
      });
}

module.exports.getMessages = (req, res) => {
  const msg = {
    author: req.user.id,
    content: req.body.content,
    date: moment(),
  };
  User.findOne({ username: req.body.target }).then((messageTarget) => {
    Chat.findOneAndUpdate(
      {
        users: { $all: [req.user.id, messageTarget._id] },
      },
      { $push: { messages: msg } },
    ).then(() => {
      console.log(
        `${moment().format('MMMM Do YYYY, h:mm:ss a')} - ${
          req.user.username
        } sent '${msg.content}' to ${messageTarget.username}.`,
      );
      res.send({ clear: '' });
    });
  });
}
  