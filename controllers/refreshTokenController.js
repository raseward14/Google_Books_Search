const db = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    handleRefreshToken: async (req, res) => {
        // GET refresh token (http://localhost:8000/api/refresh)
        // look at cookies, where the refresh token should be
        const cookies = req.cookies;
        // check to see if we have cookies, if so, do we have cookies.jwt
        if(!cookies?.jwt) return res.sendStatus(401); //unauthorized
        const refreshToken = cookies.jwt;

        // now we want to find the user that matches this refresh token
        // find this userName - if exists, return it, otherwise will be false
        try {
            db.User.find(async (err, users) => {
                if (err) res.send(err);
                const foundUser = users.find(person => person.refreshToken === refreshToken);
                
                // if there is no user, throw a forbidden error
                if(!foundUser) return res.sendStatus(403) // forbidden
                // if user does exist, verify the user - refreshToken, process.env.REFRESH_TOKEN_SECRET (whoever hosts this will have a place where refresh tokens are stored), and a callback function
                jwt.verify(
                    refreshToken,
                    process.env.REFRESH_TOKEN_SECRET,
                    (err, decoded) => {
                        // if error, throw it, or, if our found user.userName from db does not match the username of the document jwt verified based on refresh token, something has been tampered with - 403 forbidden
                        if(err || foundUser.userName !== decoded.userName)
                        return res.sendStatus(403) // forbidden
                        // if all is good, lets send a new access token, bc refresh token was verified
                        const accessToken = jwt.sign(
                            // username should be the same as decoded.userName bc it was verified
                            // should set an expiration longer in prod app, 30s is for testing
                            { "userName": decoded.userName },
                            process.env.ACCESS_TOKEN_SECRET,
                            { expiresIn: '30s' }
                        );
                        res.json({ accessToken });
                        console.log(foundUser.userName)
                    }
                );
            })
        } catch(err) {
            res.status(500).json({ 'message': err.message });
        }
    }
}