const db = require('../models');

module.exports = {
    findAll: (req, res) => {
        // GET books I've Read Shelf
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
        db.Library.find(query, (err, books) => {
            if (err) {
                res.send(err);
            } else {
                res.send(books);
            };
        });
    },
    create: (req, res) => {
        // POST Book I've Read
        const libraryBook = new db.Library();
        console.log('library controller receives this: ', req.body)
        libraryBook.title = req.body.title;
        libraryBook.authors = req.body.authors;
        libraryBook.description = req.body.description;
        libraryBook.imageLink = req.body.imageLink;
        libraryBook.infoLink = req.body.infoLink;
        libraryBook.subject = req.body.subject;
        libraryBook.isbn13 = req.body.isbn13;
        libraryBook.date = Date.now();
        libraryBook.user_id = req.body.user_id;
        libraryBook.rating = req.body.rating;
        libraryBook.save(req.body, (err) => {
            if (err) {
                res.send(err);
            } else {
                res.send({ message: 'Book added to Library:', libraryBook });
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
        });
    },

    updateRead: (req, res) => {
        console.log(`datesRead: ${req.body.datesRead}`)
        // let emptyArray = '';
        db.Library.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    favorited: req.body.favorited,
                    rating: req.body.rating,
                    datesRead: req.body.datesRead

                }
            },
            { returnOriginal: false }
        )
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
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