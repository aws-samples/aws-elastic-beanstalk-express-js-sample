const express = require('express');
const app = express();
const port = 8080;

<<<<<<< HEAD

=======
>>>>>>> 5cf70106d1dfcedaf9cc21ea6f744628fd00fd33
app.get('/', (req, res) => res.send('pipeline created'));

app.listen(port);
console.log(`App running on http://localhost:${port}`);
