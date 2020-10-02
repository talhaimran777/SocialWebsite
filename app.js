const express = require('express');
const app = express();
const path = require('path');

// Allow express to use static files
app.use(express.static('public'));

// Register a view engine
app.set('view engine','ejs');

// Get the router object
const routes = require('./routes/routes');

// If you get a get request to / redirect it to /devtal
app.get('/', (req, res) => {
    res.redirect('/social-web');
});

// Use the deined routes
app.use('/social-web', routes);

// app.get('/', (req, res) => {
//     res.render('home-page');
// });


app.listen(3000, () => console.log('listening on port 3000!'));