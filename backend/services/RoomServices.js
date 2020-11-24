const User = require('../models/User');
const Room = require('../models/Room');

module.exports.newRoom = (req, res) => {
  if (req.session.passport === undefined) res.status(401).json({ msg: 'Unauthorized' });
  else {
    User.findOne({ _id: req.session.passport.user }, (err, user) => {
      if (err) {
        return res.status(400).json('Error.. :( ');
      }
      if (user) {
        if (user.username === req.body.user1 || user.username === req.body.user2) {
          const { user2 } = req.body;
          const { user1 } = req.body;
          const n = new Room({
            user1,
            user2,
          });
          n.save().then((m) => {
            return res.status(201).json(m);
          });
        } else {
          return res.status(400).json('You have no authority to access this room');
        }
      } else {
        return res.status(400).json('Unknown id!');
      }
    });
  }
};

module.exports.findByTwo = (req, res) => {
  const filtr = {
    $or: [
      { user1: req.body.user1, user2: req.body.user2 },
      { user1: req.body.user2, user2: req.body.user1 },
    ],
  };
  Room.findOne(filtr, function (err, doc) {
    if (err) {
      res.json(err);
    } else {
      res.json(doc);
    }
  });
};

module.exports.all = (req, res) => {
  Room.find((error, docs) => {
    if (error) {
      res.json(error);
    } else {
      res.json(docs);
    }
  });
};
