const db = require('../db').db();
const ObjectID = require('mongodb').ObjectID;
const postsCollection = db.collection('posts');

// This is a post model
let Post = function(data, userData){
    this.postData = data;
    this.id = userData._id;
    this.errors = [];
}

Post.prototype.cleanUp = function(){
    //Data other than string is not required
    if(typeof(this.postData.title) != 'string'){this.postData.title = ''}
    if(typeof(this.postData.body) != 'string'){this.postData.body = ''}

    // Removing any bogus properties / Extra properties
    this.postData = {
        title: this.postData.title.trim(),
        body: this.postData.body.trim(),
        author: ObjectID(this.id),
        dateCreated: new Date()
    }
}

Post.prototype.validate = function(){
    if(this.postData.title === ''){
        console.log('Post title is empty');
        this.errors.push('Title cannot be empty.');
    }

    if(this.postData.body === ''){
        console.log('Post body is empty');
        this.errors.push('Post content cannot be empty.');
    }
}

Post.prototype.savePost = function(){

    return new Promise((resolve, reject) =>{
        this.cleanUp();
        this.validate();

        if(this.errors.length === 0){
            // Get the post data up to the database
            postsCollection.insertOne(this.postData)
            .then(() =>{
                console.log('Post Inserted successfully!');
                resolve();
            })
            .catch(() =>{
                this.errors.push('Please try again later!');
                reject(this.errors); 
            });
        }
        else{
            console.log('Could Not Insert the post to the db!');
            reject(this.errors);
        }
    });
}


module.exports = Post;