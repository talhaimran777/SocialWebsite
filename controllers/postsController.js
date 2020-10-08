exports.createPost = function(req, res){
    res.render('create-posts', {avatar: req.session.user.avatar});
}