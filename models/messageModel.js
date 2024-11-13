const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    user: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Message must have a user'],
      },
    ],
    message: {
      type: String,
      maxLength: [255, 'Must be less than 255characters'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

messageSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name email',
  });
  next();
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
