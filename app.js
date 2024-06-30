const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => res.send('Welcome to our training class on Firewalls R80!!'));
app.listen(port);
console.log(`App running on http://localhost:${port}`);
