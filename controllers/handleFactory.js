const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const ActionHistory = require('../models/actionHistoryModel');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    // const document = await Model.findByIdAndDelete(req.params.id);
    const document = await Model.findOneAndDelete({
      inventoryID: req.params.id,
    });

    if (!document) {
      return next(new AppError('No document found for the provided ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });

    let whatIsModified = '';
    if (Model.modelName === 'Inventory') {
      whatIsModified = 'inventory';
    }

    if (Model.modelName === 'Supplier') {
      whatIsModified = 'supplier';
    }

    if (Model.modelName === 'Project') {
      whatIsModified = 'project';
    }

    const actionHistoryEntry = new ActionHistory({
      user: req.user.name,
      userID: req.user.employeeID,
      modified: whatIsModified,
      modifiedName: document.material,
      modifiedID: document._id,
      itemID: document.inventoryID || document.supplierID || document.projectID,
      action: `${whatIsModified} Deleted`,
    });

    await actionHistoryEntry.save();
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!document) {
      return next(new AppError('No document found for the provided ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: document,
      },
    });

    let whatIsModified = '';
    if (Model.modelName === 'Inventory') {
      whatIsModified = 'inventory';
    }

    if (Model.modelName === 'Supplier') {
      whatIsModified = 'supplier';
    }

    if (Model.modelName === 'Project') {
      whatIsModified = 'project';
    }

    const actionHistoryEntry = new ActionHistory({
      user: req.user.name,
      userID: req.user.employeeID,
      modified: whatIsModified,
      modifiedName: document.material,
      modifiedID: document._id,
      itemID: document.inventoryID || document.supplierID || document.projectID,

      action: `${whatIsModified} updated`,
    });

    await actionHistoryEntry.save();
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.create(req.body);

    if (Model === 'Inventory') {
      req.locals.inventory = document;
    }

    res.status(201).json({
      status: 'success',
      data: {
        data: document,
      },
    });

    let whatIsModified = '';
    if (Model.modelName === 'Inventory') {
      whatIsModified = 'inventory';
    }

    if (Model.modelName === 'Supplier') {
      whatIsModified = 'supplier';
    }

    if (Model.modelName === 'Project') {
      whatIsModified = 'project';
    }

    const actionHistoryEntry = new ActionHistory({
      user: req.user.name,
      userID: req.user.employeeID,
      modified: whatIsModified,
      modifiedName: document.material || document.supplierName,
      modifiedID: document._id,
      itemID: document.inventoryID || document.supplierID || document.projectID,
      action: `${whatIsModified} created`,
    });

    await actionHistoryEntry.save();
  });

exports.getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) query = query.populate(populateOptions);
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

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.id) filter = { id: req.params.id };
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const document = await features.query;
    // const document = await features.query.explain();

    res.status(200).json({
      status: 'success',
      results: document.length,
      data: {
        document,
      },
    });
  });
