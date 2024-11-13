const ProjectManager = require('../models/projectManagerModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handleFactory');

exports.createProjectManager = factory.createOne(ProjectManager);
exports.getAllProjectManager = factory.getAll(ProjectManager);

exports.getAllProjectManagerID = catchAsync(async (req, res, next) => {
  const query = ProjectManager.findOne({
    employeeID: req.params.id,
  });
  // if (populateOptions) query = query.populate(populateOptions);
  const document = await query;

  if (!document) {
    return next(new AppError('No document found for the provided ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      document,
    },
  });
});
