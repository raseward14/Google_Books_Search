const db = require('../models/index');

module.exports = {
    findAll: (req, res) => {
        // GET My Reading Recommendations or favorites
        // uses URL query parameters, rather than path parameters, after the ? mark - found with req.query
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
        db.Favorite.find(query, (err, books) => {
            if (err) {
                res.send(err);
            } else {
                res.send(books);
            };
        })
    },
    findById: (req, res) => {
        // GET a Reading Recommendation or favorite
        db.Favorite.findById(req.params.id, (err, book) => {
            if (err) {
                res.send(err);
            } else {
                res.send(book)
            };
        })
    },
    create: (req, res) => {
        console.log('favorite controller receives this: ', req.body)
        // POST a My Reading Recommendation or favorite
        const myFavorite = new db.Favorite();
        myFavorite.title = req.body.title;
        myFavorite.description = req.body.description;
        myFavorite.authors = req.body.authors;
        myFavorite.imageLink = req.body.imageLink;
        myFavorite.subject = req.body.subject;
        myFavorite.infoLink = req.body.infoLink;
        myFavorite.isbn13 = req.body.isbn13;
        myFavorite.user_id = req.body.user_id;
        myFavorite.date = Date.now();
        myFavorite.save((err) => {
            if (err) {
                res.send(err);
            } else {
                res.send({ message: 'this book is favorited: ', myFavorite });
            };
        });
    },
    remove: (req, res) => {
        // GET a Reading Recommendation or favorite
        console.log('removed books id: ', req.params.id)
        db.Favorite.findByIdAndDelete(req.params.id, (err, book) => {
            if (err) {
                res.send(err);
            } else {
                res.send(book);
            }
        })
    },

    updateFavorite: (req, res) => {
        db.Favorite.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    rating: req.body.rating
                }
            },
            { returnOriginal: false }
        )
            .then(dbModel =>res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};