// Let's  require validator
const db = require('../db').db();
const usersCollection = db.collection('users');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

let User = function(data){
    this.data = data;
    this.errors = [];
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
    return new Promise(async (resolve, reject) => {
        // Write code here to validate entered data
        if(!validator.isLength(this.data.username, {min: 3, max: 20})){
            this.errors.push('Username must be 3 to 20 characters long!');
        }
        else if(validator.isNumeric(this.data.username)){
            this.errors.push('Username cannot contain only numbers!');
        }
        // Check for if user name contains () {} [] \ | * & ^ % $ # @ ! ` ~ < .
        else if(!validator.isAlphanumeric(this.data.username)){
            this.errors.push('Invalid username!');
        }
    
        if(!validator.isEmail(this.data.email)){
            this.errors.push('Invalid email!');
        }
    
        if(!validator.isLength(this.data.password, {min: 8, max: 20})){
            this.errors.push('Password should be 8 to 20 characters long!');
        }
    
        // Check if the entered username is valid
        if(validator.isLength(this.data.username, {min: 3, max: 20}) && !validator.isNumeric(this.data.username) && validator.isAlphanumeric(this.data.username)){
    
            // Check if the entered username is already exists
            let usernameExists = await usersCollection.findOne({username: this.data.username});
            console.log('Exists::' , usernameExists);
            if(usernameExists){
                console.log('Username is already taken!');
                this.errors.push('This username is already taken!');
            }
        }
    
    
        // Check if the entered email is valid
        if(validator.isEmail(this.data.email)){
    
            // Check if the entered email exists already
            let emailExists = await usersCollection.findOne({email: this.data.email});
            if(emailExists){
                console.log('Email Already Exists!');
                this.errors.push('This email is already taken!');
            }
        }

       // console.log('Length Before validation', this.errors.length);
        resolve();
    });
}

User.prototype.register = function(){
    return new Promise(async (resolve, reject) => {
        this.cleanUpForSignup();
        await this.validate();
    
        // if only the data is validated push the data to the database

        //console.log('Length after validation', this.errors.length);
        if(this.errors.length === 0){
            // Entered password hash value will get stored as a password in the database
            this.data.password = bcrypt.hashSync(this.data.password, salt);
    
            await usersCollection.insertOne(this.data);
            resolve();
        }
        else{
            reject(this.errors);
        }
    })
}



User.prototype.login = function(){
    return new Promise((resolve, reject) =>{
        this.cleanUpForLogin();

        usersCollection.findOne({username: this.data.username})
        .then((user) =>{
            if(user && bcrypt.compareSync(this.data.password, user.password)){
                resolve('Congrats/ Sign In Successfull!');
            }
            else{
                reject('Error/ Sign In Failed!');
            }
        })
        .catch(() =>{
            console.log('Please try again later!');
        });
    });
}

module.exports = User;