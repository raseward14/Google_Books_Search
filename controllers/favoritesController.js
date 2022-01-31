const db = require('../models/index');

module.exports = {
    findAll: (req, res) => {
        // GET My Reading Recommendations or favorites
        db.Favorite.find((err, books) => {
            if(err) {
                res.send(err);
            } else {
                res.send(books);
            };
        })
    },
    findById: (req, res) => {
        // GET a Reading Recommendation or favorite
        db.Favorite.findById(req.params.id, (err, book) => {
            if(err) {
                res.send(err);
            } else {
                res.send(book)
            };
        })
    },
    create: (req, res) => {
        // POST a My Reading Recommendation or favorite
        const myFavorite = new db.Favorite();
        myFavorite.title = req.body.title;
        myFavorite.description = req.body.description;
        myFavorite.authors = req.body.authors;
        myFavorite.date = Date.now();
        myFavorite.save(req.body, (err) => {
            if(err) {
                res.send(err);
            } else {
                res.send({ message: 'this book is favorited: ', myFavorite });
            };
        });
    },
    remove: (req, res) => {
        // GET a Reading Recommendation or favorite
        db.Favorite.findByIdAndDelete(req.params.id, (err, book) => {
            if(err) {
                res.send(err);
            } else {
                res.send(book);
            }
        })
    }
};