const Inventory = require('../models/inventoryModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handleFactory');
const ActionHistory = require('../models/actionHistoryModel');
const AppError = require('../utils/appError');

exports.setInventoryUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.supplier) req.body.supplier = req.params.supplierId;
  if (!req.body.addedBy) req.body.addedBy = req.user.id;
  next();
};

exports.createInventory = factory.createOne(Inventory);
exports.getAllInventory = factory.getAll(Inventory);
exports.getInvetory = factory.getOne(Inventory);
exports.deleteInventory = factory.deleteOne(Inventory);

// exports.updateInventory = factory.updateOne(Inventory);

exports.updateInventory = catchAsync(async (req, res, next) => {
  const document = await Inventory.findOneAndUpdate(
    { inventoryID: req.params.id },
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );
  if (!document) {
    return next(new AppError('No document found for the provided ID', 404));
  }

  const actionHistoryEntry = new ActionHistory({
    user: req.user.name,
    userID: req.user.employeeID,
    modified: 'inventory',
    modifiedName: document.material,
    modifiedID: document._id,
    itemID: document.inventoryID,
    action: 'inventory updated',
  });

  await actionHistoryEntry.save();

  res.status(200).json({
    status: 'success',
    data: {
      data: document,
    },
  });
});

exports.unloadInventory = catchAsync(async (req, res, next) => {
  const beforeUnloadDoc = await Inventory.find({ inventoryID: req.params.id });

  const document = await Inventory.findOneAndUpdate(
    { inventoryID: req.params.id },
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!document) {
    return next(new AppError('No document found for the provided ID', 404));
  }

  const actionHistoryEntry = new ActionHistory({
    user: req.user.name,
    userID: req.user.employeeID,
    modified: 'inventory',
    modifiedName: document.material,
    modifiedID: document._id,
    itemID: document.inventoryID,
    action: 'inventory unloaded',
    unloadCount: `${beforeUnloadDoc[0].quantity - document.quantity}`,
  });

  await actionHistoryEntry.save();

  res.status(200).json({
    status: 'success',
    data: {
      data: document,
    },
  });
});

exports.getInventoryID = catchAsync(async (req, res, next) => {
  const query = Inventory.findOne({
    inventoryID: req.params.id,
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
