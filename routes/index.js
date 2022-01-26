const router = require('express').Router();
const { Read, Library, Favorite } = require('../models');

// middleware to use for all requests
router.use((req, res, next) => {
    // makes sure we got to the next routes and don't stop here
    next();
})

// test route to see if our api works
router.get('/', (req, res) => {
    res.json({ message: 'welcome to our api :)' })
});

// routes that end in /read (http://localhost:8000/api/read)
router.route('/read')
    .get((req, res) => {
        // GET To Read Books List
        Read.find((err, books) => {
            if (err) {
                // res.send(err);
            } else {
                res.send(books);
            };
        });
    })
    .post((req, res) => {
        // POST a Book To Read (http://localhost:8000/api/read)
        const newRead = new Read();
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
                res.json({ message: 'Book just saved: ', newRead })
            }
        });
    });

// routes that end in /read/:id (http://localhost:8000/api/read/:id)
router.route('/read/:id')
    .get((req, res) => {
        // GET a book I read
        Read.findById(req.params.id, (err, book) => {
            if (err) {
                res.send(err);
            } else {
                res.send(book);
            };
        });
    })
    .delete((req, res) => {
        // DELETE a Book To Read
        Read.findByIdAndDelete(req.params.id, (err, book) => {
            if (err) {
                res.send(err);
            } else {
                res.send(book);
            };
        });

    })



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


// routes that end in /favorite
// GET My Reading Recommendations

// POST a My Reading Recommendation

// DELETE a Reading Recommendation



module.exports = router;