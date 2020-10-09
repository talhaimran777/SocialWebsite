// Implement express.rounter() here
// Require express package to get the router
const express = require('express');

// getting router
const router = express.Router();

// App Controllers
const userController = require('../controllers/userController');
const postsController = require('../controllers/postsController');
// User related routes
// Listen for / end point
router.get('/', userController.homePage);

// Listen for /create-user
router.post('/create-user', userController.register);

// Listen for /login
router.post('/login', userController.login);

// Listen for /logout
router.post('/logout', userController.logout);


// Posts related routes
// This route renders the create post page if you are logged in
router.get('/create-post',userController.checkLoggedIn, postsController.createPost);

// This actuly saves the post data to the database
router.post('/create-post',postsController.savePost);

module.exports = router;
