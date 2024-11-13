const express = require('express');

const authController = require('../controllers/authController');
const messageController = require('../controllers/messageController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, messageController.getAllMessages)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'manager'),
    messageController.createMessage,
  );

module.exports = router;
