const router = require('express').Router();
const refreshTokenController = require('../../controllers/refreshTokenController');

// middleware to use with all requests
router.use((req, res, next) => {
    // makes sure we go to the next routes and do not stop here
    next();
})
// routes that end in /refresh
router.route('/')
    .get(refreshTokenController.handleRefreshToken);

module.exports = router;