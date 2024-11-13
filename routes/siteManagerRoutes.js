const express = require('express');
const siteManagerController = require('../controllers/siteManagerController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .post(siteManagerController.createSiteManager)
  .get(siteManagerController.getAllSiteManager);

router.route('/:id').get(siteManagerController.getSiteManagerID);

module.exports = router;
