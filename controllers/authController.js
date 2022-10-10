const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    create: async (req, res) => {
        // POST a User to (http://localhost:8000/api/auth)
        const { userName, password } = req.body;
        if (!userName || !password) return res.status(400).json({ 'message': 'Username and password are required.' })
        // check to see if the user exists
        db.User.find( async (err, users) => {
            if (err) {
                res.send(err);
            } else {
                const foundUser = users.find(person => person.userName === userName)
                if (!foundUser) return res.status(401).send({ 'message': 'Unauthorized' }) // Unauthorized - if we dont find the user
                const match = await bcrypt.compare(password, foundUser.password)
                if (match) {
                    const accessToken = jwt.sign(
                        { "userName": foundUser.userName },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: '30s' }
                    );
                    const refreshToken = jwt.sign(
                        { "userName": foundUser.userName },
                        process.env.REFRESH_TOKEN_SECRET,
                        { expiresIn: '1d' }
                    );

                    const otherUsers = users.filter(person => person.userName !== foundUser.userName);
                    const currentUser = { ...foundUser, refreshToken };
                    // now add the current user, their refresh token, and the other users back to the db
                }
            };
        });


        // try {
        //     // encrypt the password
        //     const hashedPwd = await bcrypt.hash(password, 10);
        //     // store the new user
        //     const newUser = new db.User
        //     newUser.userName = userName;
        //     newUser.password = hashedPwd;
        //     newUser.save((err) => {
        //         if (err) {
        //             res.status(400).json({ 'message': 'Username taken.' });
        //         } else {
        //             res.json({ 'success': `New user ${userName} created!` });
        //         };
        //     });
        // } catch (err) {
        //     res.status(500).json({ 'message': err.message });
        // }
    }
}