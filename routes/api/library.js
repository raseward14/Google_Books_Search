const router = require('express').Router();
const { Library } = require('../../models');

//routes that end in /library
router.route('/library')
    .post((req, res) => {
    // POST Book I've Read
    const libraryBook = new Library();
    libraryBook.title = req.body.title;
    libraryBook.authors.authorName = req.body.authors.authorName
    libraryBook.description = req.body.description
        libraryBook.save(req.body, (err) => {
            if(err) {
                res.send(err);
            } else {
                res.send({ message: 'Book added to Library:', libraryBook });
            };
        })
    })
    .get((req, res) => {
    // GET books I've Read Shelf
        Library.find((err, books) => {
            if(err) {
                res.send(err);
            } else {
                res.send(books);
            };
        });
    });

// routes that end in /library/:id
router.route('/library/:id')
    .get((req, res) => {
        // GET a book I've read
        Library.findById(req.params.id, (err, book) => {
            if (err) {
                res.send(err);
            } else {
                res.send(book);
            };
        })
    })
    .delete((req, res) => {
        // DELETE a Book I've Read
        Library.findByIdAndDelete(req.params.id, (err, book) => {
            if (err) {
                res.send(err);
            } else {
                res.send(book);
            };
        });
    });


module.exports = router;