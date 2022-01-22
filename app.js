const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => res.send('Hello World I am New to Git & GitHub and want tolearn how to use it!'));

app.listen(port);
console.log(`App running on http://localhost:${port}`);
