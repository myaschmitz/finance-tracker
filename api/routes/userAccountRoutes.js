const express = require('express');
const router = express.Router();
const userAccountController = require('../controllers/userAccountController');

router.get('/get/:id', userAccountController.getUserById);

module.exports = router;