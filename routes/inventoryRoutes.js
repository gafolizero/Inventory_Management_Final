const express = require('express');
const inventoryController = require('../controllers/inventoryController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/')
  .post(
    inventoryController.setInventoryUserIds,
    inventoryController.createInventory,
  )
  .get(inventoryController.getAllInventory);

router
  .route('/:id')
  .get(inventoryController.getInvetory)
  .patch(inventoryController.updateInventory)
  .delete(
    authController.restrictTo('admin', 'manager'),
    inventoryController.deleteInventory,
  );

router.route('/inventoryID/:id').get(inventoryController.getInventoryID);

router.patch('/unload/:id', inventoryController.unloadInventory);

module.exports = router;
