// Let's  require validator
const db = require('../db');
const usersCollection = db.collection('users');
const validator = require('validator');

let User = function(data){
    this.data = data;
    this.errors = [];
    this.loggedIn;
}

User.prototype.cleanUpForSignup = function(){

    // Data other than string is not required
    if(typeof(this.data.username)  !== 'string'){this.data.username = ''}
    if(typeof(this.data.email)  !== 'string'){this.data.email = ''}
    if(typeof(this.data.password)  !== 'string'){this.data.password = ''}


    // Removing any bogus properties / Extra properties
    this.data = {
        username: this.data.username.trim().toLowerCase(),
        email: this.data.email.trim().toLowerCase(),
        password: this.data.password
    }
}

User.prototype.cleanUpForLogin = function(){

    // Data other than string is not required
    if(typeof(this.data.username) != 'string'){this.data.username = ''}
    if(typeof(this.data.password) != 'string'){this.data.password = ''}

    // Removing any bogus properties / Extra properties
    this.data = {
        username: this.data.username.trim().toLowerCase(),
        password: this.data.password.trim().toLowerCase(),
    }
}

User.prototype.validate = function(){
    // Write code here to validate entered data

    if(!validator.isLength(this.data.username, {min: 3, max: 20}) || validator.isNumeric(this.data.username)){
        this.errors.push('Invalid username!');
    }
    else
    // Check for if user name contains () {} [] \ | * & ^ % $ # @ ! ` ~ < .
    if(!validator.isAlphanumeric(this.data.username)){
        this.errors.push('Invalid username!');
    }

    if(!validator.isEmail(this.data.email)){
        this.errors.push('Invalid email!');
    }

    if(!validator.isLength(this.data.password, {min: 8, max: 20})){
        this.errors.push('Invalid password');
    }
}

User.prototype.register = function(){
    this.cleanUpForSignup();
    this.validate();

    // if only the data is validated push the data to the database

    if(this.errors.length === 0){
        usersCollection.insertOne({username: this.data.username, email: this.data.email, password: this.data.password}, ()=>{
            console.log('Inserted Successfully!');
        });
    }
}



User.prototype.login = function(){
    return new Promise((resolve, reject) =>{
        this.cleanUpForLogin();

        usersCollection.findOne({username: this.data.username})
        .then((user) =>{
            if(user && user.password === this.data.password){
                resolve('Congrats/ Sign In Successfull!');
            }
            else{
                reject('Error/ Sign In Failed!');
            }
        });
    });
}

module.exports = User;