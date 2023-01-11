const db = require('../models')

module.exports = {
    findAll: (req, res) => {
        // GET To Read Books List
        let thisIsbn13 = req.query.isbn13
        let query = thisIsbn13 ? { 
            $and: [
                {
                    user_id: req.query.user_id
                },
                {
                    isbn13: thisIsbn13 
                }
            ]
        } : { user_id: req.query.user_id }
        console.log('QUERY', query)
        db.Read.find(query, (err, books) => {
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
        newRead.user_id = req.body.user_id;
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
    },
    update: (req, res) => {
        // PUT a Book in progress
        // params pulls from the URL - specifies which document to retrieve
        // body pulls the object, or data that needs to be sent to the db
        db.Read.updateOne(
            { _id: req.params.id },
            { $set: { inProgress: req.body.inProgress } },
            (err, book) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send(book);
                };
            });
    }
}