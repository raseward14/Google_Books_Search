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
        Book.findAll((err, books) => {
            if(err) {
                res.send(err);
            } else {
                res.send(books);
            };
        });
    })
    .post((req, res) => {
        // POST a Book To Read (http://localhost:8000/api/read)
        const newBook = new Book();
        newBook.title = req.body.title;
        newBook.authors.authorName = req.body.authors.authorName;
        newBook.description = req.body.description;
        // newBook.imageLink = req.body.imageLink;
        // newBook.infoLink = req.body.infoLink;
        // newBook.dateAdded = req.body.dateAdded;
        newBook.save(() => {
            if(err) {
                res.send(err);
            } else {
                res.json({ message: 'Book just saved: ', newBook })
            }
        });
    })


// DELETE a Book To Read


//routes that end in /alreadyread
// GET books I've Read Shelf

// POST Book I've Read

// DELETE a Book I've Read


// routes that end in /favorites
// GET My Reading Recommendations

// POST a My Reading Recommendation

// DELETE a Reading Recommendation



module.exports = router;