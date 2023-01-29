const router = require('express').Router();
const authController = require('../../controllers/authController');

// middleware to use with all requests
router.use((req, res, next) => {
    // makes sure we go to the next routes and do not stop here
    console.log('req header in API routing ', req.header(HOST))
    next();
})
// routes that end in /auth
router.route('/')
    .post(authController.handleLogin)

module.exports = router;