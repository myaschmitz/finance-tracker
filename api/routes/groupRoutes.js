const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

router.post('/add', groupController.addGroup);
router.get('/all', groupController.getAllGroups);
router.get('/:id', groupController.getGroup);
router.post('/edit/:id', groupController.editGroup);
router.delete('/delete/:id', groupController.deleteGroup);

module.exports = router;