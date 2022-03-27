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
        libraryBook.authors = req.body.authors;
        libraryBook.description = req.body.description;
        libraryBook.imageLink = req.body.imageLink;
        libraryBook.infoLink = req.body.infoLink;
        libraryBook.date = Date.now();
        libraryBook.save(req.body, (err) => {
            if (err) {
                res.send(err);
            } else {
                res.send({ message: 'Book added to Library:', libraryBook });
            };
        })
    },
    update: (req, res) => {
        db.Library.findOneAndUpdate({ _id: req.body.id }, req.body)
        .then((dbModel) => res.json(dbModel))
        .catch((err) => res.status(422).json(err));
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