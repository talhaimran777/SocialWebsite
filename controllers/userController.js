const User = require('../models/User');

exports.register = (req, res) =>{
    let user = new User(req.body);
    user.register();
    if(user.errors.length !== 0 ){
        res.send(user.errors);
    }
    else{
        res.redirect('/');
    }
}
exports.login = (req, res) =>{
    let user = new User(req.body);
    user.login()
    .then(result => {
        req.session.user = {
            username: user.data.username
        }
        // Allowing the session data to get saved to the database and then redirects to /
        req.session.save(() => {
            res.redirect('/');
        });
    })
    .catch(err => res.send(err));
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
        res.render('home-page');
    }
}