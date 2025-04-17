// const express = require('express');
// const app = express();
// const port = 8080;

// app.get('/', (req, res) => res.send('RCB EE SALA CUP NAMDHEEE'));

// app.listen(port);
// console.log(`App running on http://localhost:${port}`);



const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

// 1. Serve everything in /public as static
app.use(express.static(path.join(__dirname, 'public')));

// 2. On "/" send the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () =>
    console.log(`App running on http://localhost:${port}`)
);
