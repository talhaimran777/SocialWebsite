// Implement express.rounter() here
// Require express package to get the router
const express = require('express');

// getting router
const router = express.Router();

// App Controllers
const userController = require('../controllers/userController');

// Listen for / end point
router.get('/', userController.homePage);

// Listen for /create-user
router.post('/create-user', userController.register);

// Listen for /login
router.post('/login', userController.login);

// Listen for /logout
router.post('/logout', userController.logout);

module.exports = router;
