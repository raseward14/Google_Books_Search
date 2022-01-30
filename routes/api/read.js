const router = require('express').Router();
const { Read } = require('../../models');

// middleware to use with all requests
router.use((req, res, next) => {
    // makes sure we go to the next routes and do not stop here
    next();
})
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

module.exports = router;