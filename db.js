const mongodb = require('mongodb');
const dotenv = require('dotenv');

// This will tell node.js to look for .env file
dotenv.config();

mongodb.connect(process.env.CONNECTIONSTRING,{useNewUrlParser: true, useUnifiedTopology: true}, (err, client) =>{
    if(!err){
        console.log('Connected to the database!');
        // Client.db() returns the database to work with
        module.exports = client;

        // Now require in app to start express server
        const app = require('./app');
        app.listen(process.env.PORT, () => {
            console.log('Listening on port 3000!');
        });
    }
    else{
        consolel.log('Error connecting to the database!');
    }
});
