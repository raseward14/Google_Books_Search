const router = require('express').Router();
// const { Favorite } = require('../../models');
const favoritesController = require('../../controllers/favoritesController');
const verifyJWT = require('../../middleware/verifyJWT');

router.use((req, res, next) => {
    // makes sure we go to the next route and dont stop here
    next();
})

// routes that end in /api/favorite
router.route('/')
    .get(verifyJWT, favoritesController.findAll)
    .post(verifyJWT, favoritesController.create)

// routes that end in api/favorite/:id
router.route('/:id')
    .get(verifyJWT, favoritesController.findById)
    .delete(verifyJWT, favoritesController.remove)

module.exports = router;