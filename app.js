const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => res.send('I have added a review stage in pipeline with manual approval condition!'));

app.listen(port);
console.log(`App running on http://localhost:${port}`);
