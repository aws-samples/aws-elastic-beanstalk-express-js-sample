const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => res.send('is it still worl=king  <br>and i made in vs code? <br> AWESOME'));

app.listen(port);
console.log(`App running on http://localhost:${port}`);
