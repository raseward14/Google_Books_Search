const router = require('express').Router();
const registerController = require('../../controllers/registerController');

// middleware to use with all requests
router.use((req, res, next) => {
    // makes sure we go to the next routes and do not stop here
    next();
})
// routes that end in /register (http://localhost:8000/api/register)
router.route('/')
    .post(registerController.create)
    .get(registerController.findAll)

module.exports = router