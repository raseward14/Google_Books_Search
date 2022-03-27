const router = require('express').Router();
const libraryController = require('../../controllers/libraryController');

//routes that end in api/library
router.route('/')
    .post(libraryController.create)
    .put(libraryController.update)
    .get(libraryController.findAll);

// routes that end in api/library/:id
router.route('/:id')
    .get(libraryController.findById)
    .delete(libraryController.remove);

module.exports = router;