const express = require('express');
const app = express();
const port = 8080;

<<<<<<< HEAD
app.get('/', (req, res) => res.send('Hello There Sample !'));
=======
app.get('/', (req, res) => res.send('Hello there This is a sample'));
>>>>>>> 9e48ec6 (change message)

app.listen(port);
console.log(`App running on http://localhost:${port}`);
