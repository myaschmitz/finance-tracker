const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

router.post('/add', accountController.addAccount);
router.get('/all', accountController.getAllAccounts);
router.get('/get/:id', accountController.getAccount);
router.post('/edit/:id', accountController.editAccount);
router.delete('/delete/:id', accountController.deleteAccount);

module.exports = router;