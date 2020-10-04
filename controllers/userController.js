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
}
exports.logout = (req, res) =>{
}


exports.homePage = (req, res) =>{
    res.render('home-page');
}