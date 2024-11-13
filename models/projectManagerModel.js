const mongoose = require('mongoose');

const projectManagerSchema = new mongoose.Schema({
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
      required: [true, 'Project Manager Must respond to someone'],
    },
  ],
  department: {
    type: String,
    required: [true, 'Please Provide Project Manager Department.'],
    lowerCase: true,
  },
});

projectManagerSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'respondingTo',
    select: 'name',
  });
  next();
});

const ProjectManager = mongoose.model('ProjectManager', projectManagerSchema);

module.exports = ProjectManager;
