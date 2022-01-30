const router = require('express').Router();
const apiRoutes = require('./api');

// middleware to use for all requests
router.use((req, res, next) => {
    // makes sure we got to the next routes and don't stop here
    next();
})
// test route to see if our api works
router.get('/', (req, res) => {
    res.json({ message: 'welcome to our api :)' })
});
// api routes
router.use('/api', apiRoutes);

module.exports = router;