const Supplier = require('../models/supplierModel');
const factory = require('./handleFactory');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.setSupplierUserIds = (req, res, next) => {
  if (!req.body.addedBy) req.body.addedBy = req.user.id;
  next();
};

exports.getAllSuppliers = factory.getAll(Supplier);
// exports.getSupplier = factory.getOne(Supplier, {
//   path: 'inventoriesSupplied',
//   select: 'material -supplier',
// });

exports.createSupplier = factory.createOne(Supplier);
exports.updateSupplier = factory.updateOne(Supplier);

exports.getSupplier = catchAsync(async (req, res, next) => {
  const query = Supplier.findOne({
    supplierID: req.params.id,
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
