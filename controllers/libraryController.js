const db = require('../models');

module.exports = {
    findAll: (req, res) => {
        // GET books I've Read Shelf
        db.Library.find((err, books) => {
            if (err) {
                res.send(err);
            } else {
                res.send(books);
            };
        });
    },
    findById: (req, res) => {
        // GET a book I've read
        db.Library.findById(req.params.id, (err, book) => {
            if (err) {
                res.send(err);
            } else {
                res.send(book);
            };
        })
    },
    create: (req, res) => {
        // POST Book I've Read
        const libraryBook = new db.Library();
        libraryBook.title = req.body.title;
        libraryBook.authors.authorName = req.body.authors.authorName
        libraryBook.description = req.body.description
        libraryBook.save(req.body, (err) => {
            if (err) {
                res.send(err);
            } else {
                res.send({ message: 'Book added to Library:', libraryBook });
            };
        })
    },
    remove: (req, res) => {
        // DELETE a Book I've Read
        db.Library.findByIdAndDelete(req.params.id, (err, book) => {
            if (err) {
                res.send(err);
            } else {
                res.send(book);
            };
        });
    }
};