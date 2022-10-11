const router = require('express').Router();
const readController = require('../../controllers/readController');
const verifyJWT = require('../../middleware/verifyJWT');

// middleware to use with all requests
router.use((req, res, next) => {
    // makes sure we go to the next routes and do not stop here
    next();
})
// routes that end in /read (http://localhost:8000/api/read)
router.route('/')
    .get(verifyJWT, readController.findAll)
    .post(verifyJWT, readController.create)

// routes that end in /read/:id (http://localhost:8000/api/read/:id)
router.route('/:id')
    .get(verifyJWT, readController.findById)
    .delete(verifyJWT, readController.remove)
    .put(verifyJWT, readController.update)

module.exports = router;