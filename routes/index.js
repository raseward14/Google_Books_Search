const router = require('express').Router();
const apiRoutes = require('./api');
const path = require('path');

// test route to see if our api works
router.get('/', (req, res) => {
    res.json({ message: 'welcome to our api :)' })
});
// api routes
router.use('/api', apiRoutes);

// we are proxying to http://localhost:8000
// if the route does not end in /api, send the index.html of the build file
// this will happen when we call the third party GET google books api
router.use((req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

module.exports = router;