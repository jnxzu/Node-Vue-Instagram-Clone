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
      // TODO poinformowac odbiorce zeby sobie odswiezyl wiadomosci czyli func ponizej (za pomoca socketow)
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

module.exports.newChat = (req, res) => {
  const {users} = req.body;
  const newChat = new Chat();
  newChat.users = users;
  newChat.save().then(() => {
    res.status(201);
  });
};


module.exports.getChats = (req, res) => {
  const { user } = req.body;
  if(user){
    Chat.find({users: user}).then((chats) => {
      return res.status(200).json(chats)
    })
  }
};
