const Inventory = require('../models/inventoryModel');
const Supplier = require('../models/supplierModel');
const History = require('../models/actionHistoryModel');
const Project = require('../models/projectModel');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const User = require('../models/userModel');
const AppError = require('../utils/appError');

exports.getHelloWorld = (req, res) => {
  res.status(200).render('base', {
    title: 'Hello World!!!!!',
  });
};

exports.getAllInventory = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };
  const features = new APIFeatures(Inventory.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const allHistory = await History.find().sort({ date: -1 });
  const allInventory = await features.query;

  res.status(200).render('getAll', {
    title: 'All Inventory',
    allInventory,
    allHistory,
  });
});

// exports.getAllInventory = catchAsync(async (req, res, next) => {
//   const allInventory = await Inventory.find();
//   res.status(200).render('getAll', {
//     title: 'All Inventory',
//     allInventory,
//   });
// });

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log Into Your Account',
  });
};

exports.getSupplierHome = (req, res) => {
  res.status(200).render('supplier', {
    title: 'Supplier',
  });
};

exports.getSupplierForm = (req, res) => {
  res.status(200).render('addSupplier', {
    title: 'Add Supplier',
  });
};

exports.getAllSuppliers = catchAsync(async (req, res, next) => {
  const allSuppliers = await Supplier.find();
  const allHistory = await History.find().sort({ date: -1 });

  res.status(200).render('getAllSuppliers', {
    title: 'Supplier List',
    allSuppliers,
    allHistory,
  });
});

exports.getAllProject = catchAsync(async (req, res, next) => {
  const allProject = await Project.find();

  res.status(200).render('getAllProjects', {
    title: 'Project List',
    allProject,
  });
});

exports.getInventoryHome = (req, res) => {
  res.status(200).render('inventory', {
    title: 'Inventory',
  });
};

exports.getInventoryForm = catchAsync(async (req, res) => {
  const allSuppliers = await Supplier.find();

  res.status(200).render('addInventory', {
    title: 'Add Inventory',
    allSuppliers,
  });
});

exports.getProjectForm = (req, res) => {
  res.status(200).render('addProject', {
    title: 'Add Project',
  });
};

// exports.getAllInventory = catchAsync(async (req, res, next) => {
//   const allInventory = await Inventory.find(req.query);
//   console.log('req Query', req.query);
//   res.status(200).render('getAll', {
//     title: 'All Inventory',
//     allInventory,
//   });
// });

exports.getSupplier = catchAsync(async (req, res, next) => {
  const supplier = await Supplier.findOne({ slug: req.params.slug }).populate({
    path: 'inventoriesSupplied',
    select: 'material -supplier addedBy inventoryID',
  });
  res.status(200).render('getSupplier', {
    title: 'Get Supplier',
    supplier,
  });
});

exports.getInventory = catchAsync(async (req, res, next) => {
  const inventory = await Inventory.findById(req.params.id);

  if (!inventory) {
    return next(new AppError('There is no inventory with that name', 404));
  }
  res.status(200).render('getInventory', {
    title: 'Get Inventory',
    inventory,
  });
});

exports.getProject = catchAsync(async (req, res, next) => {
  const project = await Project.findOne({
    projectID: req.params.id,
  });

  if (!project) {
    return next(new AppError('There is no Project with that name', 404));
  }
  res.status(200).render('getProject', {
    title: 'Get Project',
    project,
  });
});

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your Account',
  });
};

exports.newSignup = (req, res) => {
  res.status(200).render('signup', {
    title: 'New Sign Up',
  });
};

exports.unloadInventory = (req, res) => {
  res.status(200).render('unloadInventory', {
    title: 'Unload Inventory',
  });
};

exports.allUsers = catchAsync(async (req, res) => {
  const allUsers = await User.find({ roles: { $ne: 'admin' } });
  res.status(200).render('allUsers', {
    title: 'All Users',
    allUsers,
  });
});

exports.getAllHistory = catchAsync(async (req, res, next) => {
  const allHistory = await History.find().sort({ date: -1 });

  res.status(200).render('checkActivity', {
    title: 'Activity History',
    allHistory,
  });
});
