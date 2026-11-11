const express = require('express');
const router= express.Router();
const userController = require('../controllers/userController');


router.post('/enrollment', userController.createUser);
router.put('/enrollment', userController.updateUser);
router.get('/enrollment', userController.getAllUsers);
module.exports = router;