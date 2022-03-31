const router = require('express').Router();
const libraryController = require('../../controllers/libraryController');

//routes that end in api/library
router.route('/')
    .post(libraryController.create)
    .get(libraryController.findAll);
    
    // routes that end in api/library/:id
    router.route('/:id')
    .get(libraryController.findById)
    .put(libraryController.update)
    .delete(libraryController.remove);

module.exports = router;