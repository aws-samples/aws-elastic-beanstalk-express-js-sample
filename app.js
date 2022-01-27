const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => res.send('Hello World I am New to Git & GitHub and want to learn how to use it , pushing code for testing!'));

app.listen(port);
console.log(`App running on http://localhost:${port}`);
