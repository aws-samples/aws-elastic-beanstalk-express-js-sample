const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => res.send('This is a tutorial and my goal is to learn from this tutorial! This is my third attempt at learning and I will continue to try to learn.'));

app.listen(port);
console.log(`App running on http://localhost:${port}`);
