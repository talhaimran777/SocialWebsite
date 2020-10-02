const express = require('express');
const app = express();
const path = require('path');

// Allow express to use static files
app.use(express.static('public'));

// Register a view engine
app.set('view engine','ejs');

app.get('/', (req, res) => {
    res.render('home-page');
});


app.listen(3000, () => console.log('listening on port 3000!'));