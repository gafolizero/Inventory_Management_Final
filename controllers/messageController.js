const catchAsync = require('../utils/catchAsync');
const Message = require('../models/messageModel');

exports.getAllMessages = catchAsync(async (req, res, next) => {
  const messages = await Message.find();

  res.status(200).json({
    status: 'success',
    results: messages.length,
    data: {
      messages,
    },
  });
});

exports.createMessage = catchAsync(async (req, res, next) => {
  const newMessage = await Message.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      newMessage,
    },
  });
});
