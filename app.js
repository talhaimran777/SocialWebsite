const express = require('express');
const app = express();


app.get('/', (req, res) => res.send(`let's build a social website`));


app.listen(3000, () => console.log('listening on port 3000!'));