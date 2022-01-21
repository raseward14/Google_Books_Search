const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
    title: String,
    authors: [{
        authorName: String
    }],
    description: String,
    imageLink: String, 
    infoLink: String,
    dateAdded: Date,
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
