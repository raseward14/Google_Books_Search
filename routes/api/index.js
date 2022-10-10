const router = require('express').Router();

const favoriteRoutes = require('./favorite');
const libraryRoutes = require('./library');
const readRoutes = require('./read');
const registerRoutes = require('./register');
const authRoutes = require('./auth');

// middleware to use for all requests
router.use((req, res, next) => {
    // makes sure we got to the next routes and don't stop here
    next();
})

// routes that end in /api/favorite & /api/read & /api/library & /api/register & /api/auth
router.use('/favorite', favoriteRoutes);
router.use('/read', readRoutes);
router.use('/library', libraryRoutes);
router.use('/register', registerRoutes);
router.use('/auth', authRoutes);


module.exports = router;