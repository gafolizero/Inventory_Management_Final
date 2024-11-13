const mongoose = require('mongoose');

const actionHistorySchema = new mongoose.Schema({
  user: {
    type: String,
  },
  userID: {
    type: String,
  },
  modified: {
    type: String,
  },
  modifiedName: {
    type: String,
  },
  modifiedID: {
    type: String,
  },
  itemID: {
    type: String,
  },
  unloadCount: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  action: {
    type: String,
  },
});

const ActionHistory = mongoose.model('ActionHistory', actionHistorySchema);

module.exports = ActionHistory;
