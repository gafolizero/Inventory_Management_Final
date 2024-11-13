const express = require('express');
const actionHistoryController = require('../controllers/actionHistoryController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.route('/').get(actionHistoryController.getAllHistory);

module.exports = router;
