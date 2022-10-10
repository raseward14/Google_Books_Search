const express = require('express');
const app = express();
// mongoose schema model
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
// routes
const routes = require('./routes');

// built-in middleware handles urlencoded form data
app.use(express.urlencoded({extended: true}));
// built-in middleware for JSON
app.use(express.json());
// built-in middleware for cookies
app.use(cookieParser());

// routes
app.get('/hello', (req, res) => res.send('Hello!'));
// post name as JSON BODY and get 'Hello Richard!'
app.post('/hello', (req, res) => res.send(`Hello ${req.body.name}!`));
// get name as URL PARAMS and get 'Hello Richard!'
app.get('/hello/:name', (req, res) => res.send(`Hello ${req.params.name}`));

// all of our routes will be prefixed with /api
app.use(routes);

mongoose.connect('mongodb://localhost:27017/google-books-search', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.listen(8000, () => console.log('Listening on port 8000!'));

// google books api documentation
// https://developers.google.com/books/docs/v1/getting_started?csw=1
// https://developers.google.com/books/docs/v1/using


// post a book
// const { Book } = require('./models');
// const myBook = new Book({
//     title: 'Billy Summers'
// })

// myBook.save().then(() => console.log('the book im reading now!'))