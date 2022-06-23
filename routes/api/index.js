const router = require('express').Router();

const favoriteRoutes = require('./favorite');
const libraryRoutes = require('./library');
const readRoutes = require('./read');
const registerRoutes = require('./register');

// middleware to use for all requests
router.use((req, res, next) => {
    // makes sure we got to the next routes and don't stop here
    next();
})

// routes that end in /api/favorite & /api/read & /api/library & /api/register
router.use('/favorite', favoriteRoutes);
router.use('/read', readRoutes);
router.use('/library', libraryRoutes);
router.use('/register', registerRoutes);


module.exports = router;