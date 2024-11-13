// const AppError = require('../utils/appError');
const ActionHistory = require('../models/actionHistoryModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handleFactory');

exports.createActionHistory = (action) =>
  catchAsync(async (req, res, next) => {
    const newAction = await ActionHistory.create({
      user: req.user.name,
      userID: req.user.id,
      inventoryID: req.params.id,
      action: action + '→Inventory Id: ' + req.params.id,
    });
  });

exports.getAllHistory = factory.getAll(ActionHistory);
