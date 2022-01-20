const express = require('express');
const app = express();

// middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// routes
app.get('/hello', (req, res) => res.send('Hello!'));
// post name as JSON BODY and get 'Hello Richard!'
app.post('/hello', (req, res) => res.send(`Hello ${req.body.name}!`));
// get name as URL PARAMS and get 'Hello Richard!'
app.get('/hello/:name', (req, res) => res.send(`Hello ${req.params.name}`));

app.listen(8000, () => console.log('Listening on port 8000!'));

// google books api documentation
// https://developers.google.com/books/docs/v1/getting_started?csw=1
// https://developers.google.com/books/docs/v1/using

