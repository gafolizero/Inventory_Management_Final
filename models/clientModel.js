const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Please enter name'],
  },
  contactNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  clientType: {
    type: String,
    required: true,
  },
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
