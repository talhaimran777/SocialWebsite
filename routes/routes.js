// Implement express.rounter() here
// Require express package to get the router
const express = require('express');

// getting router
const router = express.Router();

// App Controllers
const userController = require('../controllers/userController');

// Listen for /social-web/ end point
router.get('/', userController.homePage);

// Listen for /social-web/create-user
router.post('/create-user', userController.register);

// Listen for /social-web/create-user
router.post('/login', userController.login);

module.exports = router;
