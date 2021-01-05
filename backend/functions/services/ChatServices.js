const moment = require('moment');
const Chat = require('../models/Chat');

module.exports.newMessage = (req, res) => {
  const { author, content, target } = req.body;

  const msg = {
    author,
    content,
    date: moment(),
  };

  Chat.findOneAndUpdate({ users: { $all: [author, target] } }, { $push: { messages: msg } }).then(
    () => {
      // let the other guy know to reload messages (SOCKETS)
      return res.status(201);
    }
  );
};

module.exports.getMessages = (req, res) => {
  const { chatId } = req.params;
  Chat.findById(chatId).then((chat) => {
    return res.status(200).json(chat);
  });
};

module.exports.newChat = (req, res) => {};

module.exports.getChats = (req, res) => {};
