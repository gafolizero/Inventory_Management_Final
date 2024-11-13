const express = require('express');
const clientController = require('../controllers/clientController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .post(clientController.createClient)
  .get(clientController.getAllClient);

module.exports = router;
