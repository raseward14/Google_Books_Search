const db = require('../models')

module.exports = {
    findAll: (req, res) => {
        // GET To Read Books List
        db.Read.find((err, books) => {
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
        newRead.authors.authorName = req.body.authors[0].authorName;
        newRead.description = req.body.description;
        // newRead.imageLink = req.body.imageLink;
        // newRead.infoLink = req.body.infoLink;
        // newRead.dateAdded = req.body.dateAdded;
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