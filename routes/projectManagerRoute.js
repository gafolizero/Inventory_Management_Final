const express = require('express');
const projectManagerController = require('../controllers/projectManagerController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .post(projectManagerController.createProjectManager)
  .get(projectManagerController.getAllProjectManager);

router.route('/:id').get(projectManagerController.getAllProjectManagerID);

module.exports = router;
