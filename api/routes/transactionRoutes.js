const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.post('/add', transactionController.addTransaction);
router.get('/all', transactionController.getAllTransactions);
router.get('/:id', transactionController.getTransaction);
router.post('/edit/:id', transactionController.editTransaction);
router.delete('/delete/:id', transactionController.deleteTransaction);

module.exports = router;