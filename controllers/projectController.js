const Project = require('../models/projectModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handleFactory');
const AppError = require('../utils/appError');

exports.createProject = factory.createOne(Project);

exports.getAllProject = factory.getAll(Project);
exports.getProject = catchAsync(async (req, res, next) => {
  const query = await Project.find({ projectID: req.params.id });

  if (!query) {
    return next(new AppError('No Document found for the provided ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      query,
    },
  });
});
