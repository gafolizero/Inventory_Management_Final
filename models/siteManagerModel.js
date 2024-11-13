const mongoose = require('mongoose');

const siteManagerSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Please enter name'],
  },
  contactNumber: {
    type: Number,
    required: true,
  },
  employeeID: {
    type: String,
    required: true,
    unique: true,
  },
  employeeType: {
    type: String,
    required: [true, 'Please Enter Employee Type'],
    lowerCase: true,
  },
  respondingTo: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'site Manager Must respond to someone'],
    },
  ],
  department: {
    type: String,
    required: [true, 'Please Provide site Manager Department.'],
    lowerCase: true,
  },
});

siteManagerSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'respondingTo',
    select: 'name',
  });
  next();
});

const SiteManager = mongoose.model('SiteManager', siteManagerSchema);

module.exports = SiteManager;
