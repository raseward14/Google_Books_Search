const router = require('express').Router();
// const { Favorite } = require('../../models');
const favoritesController = require('../../controllers/favoritesController');

router.use((req, res, next) => {
    // makes sure we go to the next route and dont stop here
    next();
})

// routes that end in /api/favorite
router.route('/')
    .get(favoritesController.findAll)
    .post(favoritesController.create)

// routes that end in api/favorite/:id
router.route('/:id')
    .get(favoritesController.findById)
    .delete(favoritesController.remove)

module.exports = router;