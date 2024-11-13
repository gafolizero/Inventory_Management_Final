const SiteManager = require('../models/siteManagerModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handleFactory');

exports.createSiteManager = factory.createOne(SiteManager);
exports.getAllSiteManager = factory.getAll(SiteManager);

exports.getSiteManagerID = catchAsync(async (req, res, next) => {
  const query = SiteManager.findOne({
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
