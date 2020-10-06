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
        res.redirect('/');
    })
    .catch(err => res.send(err));
}
exports.logout = (req, res) =>{
}


exports.homePage = (req, res) =>{
    if(req.session.user){
        res.send('Wellcome to Application/ Social Web!');
    }
    else{
        res.render('home-page');
    }
}