const router = require('express').Router();
const { newMessage, getMessages, newChat, getChats } = require('../services/ChatServices');

const rejectMethod = (_req, res) => {
  res.sendStatus(405);
};

// NEW MESSAGE
router.route('/newMsg').post(newMessage).all(rejectMethod);

// GET MESSAGES
router.route('/getMsg/:chatId').get(getMessages).all(rejectMethod);

// NEW CHAT
router.route('/newChat').post(newChat).all(rejectMethod);

// GET CHATS
router.route('/getChats').get(getChats).all(rejectMethod);

module.exports = router;
