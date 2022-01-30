const router = require('express').Router();

const favoriteRoutes = require('./favorite');
const libraryRoutes = require('./library');
const readRoutes = require('./read');

// middleware to use for all requests
router.use((req, res, next) => {
    // makes sure we got to the next routes and don't stop here
    next();
})

router.use('/favorite', favoriteRoutes);
router.use('/read', readRoutes);
router.use('/library', libraryRoutes);

module.exports = router;