const express = require('express');
const app = express();
const port = 8080;

<<<<<<< HEAD
app.get('/', (req, res) => res.send('You have power over your mind — not outside events!'));
=======
app.get('/', (req, res) => res.send('Hellow World!'));
>>>>>>> 3aab40564023394622b363031e802bedbfaf8297

app.listen(port);
console.log(`App running on http://localhost:${port}`);
