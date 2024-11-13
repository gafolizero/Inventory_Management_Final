const express = require('express');
const authController = require('../controllers/authController');
const projectController = require('../controllers/projectController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .post(projectController.createProject)
  .get(projectController.getAllProject);
router.route('/:id').get(projectController.getProject);

module.exports = router;
