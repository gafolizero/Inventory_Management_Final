const express = require('express');

const viewController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

const redirectIfLoggedIn = (req, res, next) => {
  if (res.locals.user) {
    return res.redirect('/');
  }
  next();
};

router.get('/', authController.isLoggedIn, viewController.getHelloWorld);

router.get(
  '/login',
  authController.isLoggedIn,
  redirectIfLoggedIn,
  viewController.getLoginForm,
);

router.get('/me', authController.protect, viewController.getAccount);

router.use(authController.isLoggedIn);

router.get('/supplier', authController.protect, viewController.getSupplierHome);

router.get(
  '/supplier/addSupplier',
  authController.protect,
  viewController.getSupplierForm,
);
router.get(
  '/supplier/getAllSuppliers',
  authController.protect,
  viewController.getAllSuppliers,
);
router.get(
  '/supplier/:slug',
  authController.protect,
  viewController.getSupplier,
);

router.get('/user', authController.protect, viewController.allUsers);
router.get(
  '/inventory',
  authController.protect,
  viewController.getInventoryHome,
);

router.get(
  '/inventory/getAll',
  authController.protect,
  viewController.getAllInventory,
);

router.get(
  '/inventory/addInventory',
  authController.protect,
  viewController.getInventoryForm,
);

router.get(
  '/inventory/unloadInventory',
  authController.protect,
  authController.restrictTo('admin', 'manager'),
  viewController.unloadInventory,
);

router.get(
  '/inventory/:id',
  authController.protect,
  viewController.getInventory,
);

router.get(
  '/signup',
  authController.protect,
  authController.restrictTo('admin', 'manager'),
  viewController.newSignup,
);

router.get(
  '/project/addProject',
  authController.protect,
  authController.restrictTo('admin', 'manager'),
  viewController.getProjectForm,
);

router.get(
  '/project/getAllProject',
  authController.protect,
  viewController.getAllProject,
);

router.get('/project/:id', authController.protect, viewController.getProject);

router.get('/history', authController.protect, viewController.getAllHistory);

module.exports = router;
