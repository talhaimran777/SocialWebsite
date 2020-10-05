// Let's  require validator
const db = require('../db');
const usersCollection = db.collection('users');
const validator = require('validator');

let User = function(data){
    this.data = data;
    this.errors = [];
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
    this.validate();

    // if only the data is validated push the data to the database

    if(this.errors === 0){
        usersCollection.insertOne({username: this.data.username, email: this.data.email, password: this.data.password}, ()=>{
            console.log('Inserted Successfully!');
        });
    }
}

module.exports = User;