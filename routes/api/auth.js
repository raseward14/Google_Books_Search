const router = require('express').Router();

//BRING BACK
// const authController = require('../../controllers/authController');

const authController2 = require('../../controllers/authController2');


// middleware to use with all requests
router.use((req, res, next) => {
    // makes sure we go to the next routes and do not stop here
    next();
})
// BRING BACK
// routes that end in /auth
// router.route('/')
//     .post(authController.handleLogin)

router.route('/')
    .post(authController2.handleLogin)


module.exports = router;