/* eslint-disable consistent-return */
const Message = require('../models/Message');
const User = require('../models/User');

module.exports.newMessage = (req, res) => {
  if (req.session.passport === undefined) res.status(401).json({ msg: 'Unauthorized' });
  else {
    const { recipent } = req.body;
    const { content } = req.body;
    User.findOne({ _id: req.session.passport.user }, (err, user) => {
      if (err) {
        return res.status(400).json('Error.. :( ');
      }
      if (user) {
        if (user.username === req.body.sender) {
          console.log('continue..');
        } else {
          return res.status(400).json('You have no authority to send this message.');
        }
      } else {
        return res.status(400).json('Unknown id!');
      }
    });
    const { sender } = req.body;
    if (!sender) {
      return res.status(401);
    }
    const n = new Message({
      sender,
      recipent,
      content,
    });
    n.save().then((m) => {
      return res.status(201).json(m);
    });
  }
};

module.exports.inbox = (req, res) => {
  // eslint-disable-next-line array-callback-return
  Message.find((error, docs) => {
    if (error) {
      res.json(error);
    } else {
      res.json(docs);
    }
  });
};

module.exports.findRoomsMessages = (req, res) => {
  const filtr = {
    $or: [
      { sender: req.body.user1, recipent: req.body.user2 },
      { recipent: req.body.user1, sender: req.body.user2 },
    ],
  };
  Message.find(filtr, function (err, doc) {
    if (err) {
      res.json(err);
    } else {
      res.json(doc);
    }
  });
};
