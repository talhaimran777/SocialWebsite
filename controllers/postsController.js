const Post = require('../models/Post');
exports.createPost = function(req, res){
    res.render('create-posts');
}

exports.savePost = function(req, res){
    let post = new Post(req.body, req.session.user);
    post.savePost()
    .then(() =>{
        res.send('Post saved successfully!');
    })
    .catch((errs) =>{
      res.send(errs);  
    });
}