const router = require('express').Router();
const libraryController = require('../../controllers/libraryController');
const verifyJWT = require('../../middleware/verifyJWT');

//routes that end in api/library
router.route('/')
    .post(verifyJWT, libraryController.create)
    .get(libraryController.findAll);
    
// routes that end in api/library/:id
router.route('/:id')
    .get(verifyJWT, libraryController.findById)
    .put(verifyJWT, libraryController.update)
    .delete(verifyJWT, libraryController.remove);

module.exports = router;