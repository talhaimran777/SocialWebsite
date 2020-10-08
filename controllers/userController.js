const User = require('../models/User');

exports.register = (req, res) =>{
    let user = new User(req.body);
    user.register()
    .then(() => {
        // If registration was successful then bring the user into the application
        req.session.user = {username: user.data.username};
        req.session.save(() => res.redirect('/'));
    })
    .catch((regErrors) =>{
        console.log('Errors: ', regErrors);
        regErrors.forEach((err) =>{
            req.flash('regErrors',err);
        })
        req.session.save(() => res.redirect('/'));
    });
}
exports.login = (req, res) =>{
    let user = new User(req.body);
    user.login()
    .then(result => {
        req.session.user = {
            username: user.data.username
        }
        // Allowing the session data to get saved to the database and then redirects to /
        req.session.save(() => res.redirect('/'));
    })
    .catch(err => {
        req.flash('errors', err);
        req.session.save(() => res.redirect('/'));
    });
}
exports.logout = (req, res) =>{
    // Destroy the current user session from the db
    req.session.destroy(function() {

        // Once the session data gets destroyed show the home page
        res.redirect('/');
    });
}



exports.homePage = (req, res) =>{
    if(req.session.user){
        res.render('home-dashboard', {name: req.session.user.username});
    }
    else{
        res.render('home-page', {errors: req.flash('errors'), regErrors: req.flash('regErrors')});
    }
}