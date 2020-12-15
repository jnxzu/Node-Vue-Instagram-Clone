const mongoose = require('../mongoose');

const { Schema } = mongoose;

const MessageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  content: {
    type: String,
  },
  date: {
    type: Date,
  },
});

const ChatSchema = new Schema({
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  messages: [MessageSchema],
});

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;
