const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    handleLogin: async (req, res) => {
        // POST a User to (http://localhost:8000/api/auth)
        const { userName, password } = req.body;
        console.log(req)
        if (!userName || !password) return res.sendStatus(400).json({ 'message': 'Username and password are required.' })
        try {
            // check to see if the user exists
            db.User.find(async (err, users) => {
                if (err) {
                    res.send(err);
                } else {
                    const foundUser = users.find(person => person.userName === userName)
                    if (!foundUser) return res.status(401).send({ 'message': 'Unauthorized' }) // Unauthorized - if we dont find the user
                    const match = await bcrypt.compare(password, foundUser.password)

                    if (match) {
                        const userID = foundUser._id

                        const accessToken = jwt.sign(
                            { "userName": foundUser.userName },
                            process.env.REACT_APP_ACCESS_TOKEN_SECRET,
                            { expiresIn: '2h' },
                        );
                        const refreshToken = jwt.sign(
                            { "userName": foundUser.userName },
                            process.env.REACT_APP_REFRESH_TOKEN_SECRET,
                            { expiresIn: '1d' },
                        );

                        // add the current user & their refresh token to the db
                        const myQuery = { userName: foundUser.userName }
                        const updatedValues = { $set: { refreshToken: refreshToken } };
                        console.log('refresh token & update value: ', refreshToken)

                        db.User.updateOne(myQuery, updatedValues, (err, res) => {
                            if (err) throw err;
                            console.log('no error: 1 document updated');
                        })

                        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: 'None' });
                        // sameSite: 'None', -> removed this
                        // store in memory - not secure in localStorage - 30s lifespan
                        res.json({ accessToken, userID });
                    } else {
                        res.status(401); // unauthorized
                    }
                };
            });
        } catch (err) {
            res.status(500).json({ 'message': err.message });
        }
    },
    findUser: (req, res) => {
        db.User.find((err, users) => {
            if (err) {
                res.send(err);
            } else {
                res.send(users);
            };
        });
    }
}