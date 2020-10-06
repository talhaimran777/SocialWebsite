const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const MonogStore = require('connect-mongo')(session);
// Configure the sessions

let sessionOptions = session({
    secret: 'keyboard cat',
    store: new MonogStore({client: require('./db')}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true
    } 
});

// Allowing sessions
app.use(sessionOptions);

// Allow express to use static files
app.use(express.static('public'));

// Binds the submitted data the req.body object
app.use(express.urlencoded({extended: false}));

// If you want to send json data the server
app.use(express.json());

// Register a view engine
app.set('view engine','ejs');

// Get the router object
const routes = require('./routes/routes');

// Start routing from /
app.use('/', routes);

// app.get('/', (req, res) => {
//     res.render('home-page');
// });

// exporting this app object to db file
module.exports = app;