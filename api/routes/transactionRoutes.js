const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.post('/add', transactionController.addTransaction);
router.get('/all', transactionController.getAllTransactions);
router.get('/:id', transactionController.getTransaction);

module.exports = router;