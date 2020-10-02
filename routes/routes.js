// Implement express.rounter() here
// Require express package to get the router
const express = require('express');

// getting router
const router = express.Router();

// Listen for /social-web/ end point
router.get('/', (req, res) => {
    res.render('./home-page');
});


module.exports = router;
