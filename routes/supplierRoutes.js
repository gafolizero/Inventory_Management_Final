const express = require('express');

const authController = require('../controllers/authController');
const supplierController = require('../controllers/supplierController');
const actionHistoryController = require('../controllers/actionHistoryController');
const inventoryRouter = require('./inventoryRoutes');

const router = express.Router();
// GET /supplier/suppID/inventory
// router
//   .route('/:supplierId/inventory')
//   .post(
//     authController.protect,
//     inventoryController.setInventoryUserIds,
//     inventoryController.createInventory,
//   );

router.use('/:supplierId/inventory', inventoryRouter);

router.use(authController.protect);

router
  .route('/')
  .get(supplierController.getAllSuppliers)
  .post(
    supplierController.setSupplierUserIds,
    authController.restrictTo('admin', 'manager'),
    supplierController.createSupplier,
    actionHistoryController.createActionHistory('Add Supplier'),
  );

router.route('/:id').get(supplierController.getSupplier);

module.exports = router;
