const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => res.send('This is Me Sheikh Amir say Hello World to all!'));

app.listen(port);
console.log(`App running on http://localhost:${port}`);
