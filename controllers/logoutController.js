const db = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    handleLogout: async (req, res) => {
        // clientside also needs to delete the accessToken - needs to be done in memory of client application, cannot be done on the back end, zero it out, or set it to blank. we can take care of the refresh token here though

        // look at cookies, where the refresh token should be
        const cookies = req.cookies;
        // check to see if we have cookies, if so, do we have cookies.jwt
        if (!cookies?.jwt) return res.sendStatus(204); // success updated or deleted, a 201 is for success, created
        const refreshToken = cookies.jwt;

        // is refresh token in db
        try {
            db.User.find(async (err, users) => {
                if (err) {
                    res.send(err);
                } else {
                    // now we want to find the user that matches this refresh token
                    // find this userName - if exists, return it, otherwise will be false
                    const foundUser = users.find(person => person.refreshToken === refreshToken)
                    // if we dont find a user, but we do have a cookie, we can clear the cookie that was sent
                    if (!foundUser) {
                        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
                        return res.sendStatus(204); // success, no content
                    };

                    // if we did find the same refresh token in the db, lets delete it from the db
                    const myQuery = { "userName": foundUser.userName }
                    const newValues = { $set: { refreshToken: '' } }
                    db.User.updateOne(myQuery, newValues, (err, res) => {
                        if (err) throw err;
                        console.log(`${foundUser.userName}'s refreshToken deleted!`)
                    })

                    // flag secure: true - only serves on https - dont add in dev, we would in prod
                    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
                    res.sendStatus(204); // success, no content
                }
            })
        } catch (err) {
            res.status(500).json({ 'message': err.message });
        }
    }
}