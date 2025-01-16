const express = require('express');
const cors = require('cors')
const app = express();
const port = 8080;

app.use(cors());
// KOMENTARAS
app.get('/', (req, res) => res.send('Hello World from PagaliauSSS kazkas pavyko 5 !'));
app.get('/user', (req, res) => res.send({
	name: "petras",
	email: "petras@gmail.com",
	password: "123456",
}));
app.post('/user', (req, res) => {
	const users = req.body;

	console.log('users req.body', req.body);

	res.send({
		message: 'New user was added to the list',
	});
});

app.listen(port);
console.log(`App running on http://localhost:${port}`);
