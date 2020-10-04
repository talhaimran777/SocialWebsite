const mongodb = require('mongodb');

const connectionString = `mongodb+srv://talhaimran:talha157@cluster0.u8ext.gcp.mongodb.net/SocialWebsite?retryWrites=true&w=majority`;

mongodb.connect(connectionString,{useNewUrlParser: true, useUnifiedTopology: true}, (err, client) =>{
    if(!err){
        console.log('Connected to the database!');
        // Client.db() returns the database to work with
        module.exports = client.db();

        // Now require in app to start express server
        const app = require('./app');
        app.listen(3000, () => {
            console.log('Listening on port 3000!');
        });
    }
    else{
        consolel.log('Error connecting to the database!');
    }
});
