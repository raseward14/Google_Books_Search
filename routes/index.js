const router = require('express').Router();
const apiRoutes = require('./api');

// test route to see if our api works
router.get('/', (req, res) => {
    res.json({ message: 'welcome to our api :)' })
});
// api routes
router.use('/api', apiRoutes);

module.exports = router;