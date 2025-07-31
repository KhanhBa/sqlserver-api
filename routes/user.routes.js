const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth')
router.get('/:id/music',authMiddleware, userController.getUserWithMusics);
router.post('/music', userController.createMusic);
router.post('/auth', userController.login);
module.exports = router;
