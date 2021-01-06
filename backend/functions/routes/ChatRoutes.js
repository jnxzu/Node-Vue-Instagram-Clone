const router = require('express').Router();
const { newMessage, getMessages, newChat, getChats } = require('../services/ChatServices');

const rejectMethod = (_req, res) => {
  res.sendStatus(405);
};

// NEW MESSAGE
router.route('/msg').post(newMessage).all(rejectMethod);

// GET MESSAGES
router.route('/msg/:chatId').get(getMessages).all(rejectMethod);

// NEW CHAT
router.route('/chat').post(newChat).all(rejectMethod);

// GET CHATS
router.route('/chat').get(getChats).all(rejectMethod);

module.exports = router;
