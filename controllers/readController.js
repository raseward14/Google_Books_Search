const db = require('../models')

module.exports = {
    findByIsbn: (req, res) => {
        // GET To Read Books by isbn13
        db.Read.find({ isbn13: req.query.isbn13 }, (err, book) => {
            if (err) {
                res.send(err);
            } else {
                res.send(book);
            };
        });
    },
    findAll: (req, res) => {
        // GET To Read Books List
        let thisIsbn13 = req.query.isbn13
        console.log(req.query.isbn13)
        let condition = thisIsbn13 ? {isbn13: thisIsbn13} : {}
        db.Read.find(condition, (err, books) => {
            if (err) {
                res.send(err);
            } else {
                res.send(books);
            };
        });
    },
    findById: (req, res) => {
        // GET a book I read
        db.Read.findById(req.params.id, (err, book) => {
            if (err) {
                res.send(err);
            } else {
                res.send(book);
            };
        });
    },
    create: (req, res) => {
        // POST a Book To Read (http://localhost:8000/api/read)
        const newRead = new db.Read();
        newRead.title = req.body.title;
        newRead.authors = req.body.authors;
        newRead.description = req.body.description;
        newRead.imageLink = req.body.imageLink;
        newRead.infoLink = req.body.infoLink;
        newRead.isbn13 = req.body.isbn13;
        newRead.date = Date.now();
        newRead.save((err) => {
            if (err) {
                res.send(err);
            } else {
                res.json({ message: 'Book just saved: ', newRead });
            };
        });
    },
    remove: (req, res) => {
        // DELETE a Book To Read
        db.Read.findByIdAndDelete(req.params.id, (err, book) => {
            if (err) {
                res.send(err);
            } else {
                res.send(book);
            };
        });

    }
}