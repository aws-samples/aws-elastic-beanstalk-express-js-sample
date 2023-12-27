const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => res.send('This is my first wudevva, being source managed in wudevva... oh... wait! I know what it is..... Gitty-up, ehhh...... Github!'));

app.listen(port);
console.log(`App running on http://localhost:${port}`);
console.log(`crapperdapper!`);
