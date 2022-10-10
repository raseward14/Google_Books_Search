const router = require('express').Router();
const authController = require('../../controllers/authController');

// middleware to use with all requests
router.use((req, res, next) => {
    // makes sure we go to the next routes and do not stop here
    next();
})
// routes that end in /auth
router.route('/')
    .post(authController.create)

module.exports = router;