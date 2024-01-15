const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.post('/add', categoryController.addCategory);
router.get('/all', categoryController.getAllCategories);
router.get('/get/:id', categoryController.getCategory);
router.post('/edit/:id', categoryController.editCategory);
router.delete('/delete/:id', categoryController.deleteCategory);

module.exports = router;