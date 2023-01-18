const db = require('../models');
const bcrypt = require('bcrypt');

module.exports = {
    create: async (req, res) => {
        // POST a User to (http://localhost:8000/api/register)
        const { userName, password } = req.body;
        console.log(userName, password)
        if (!userName || !password) return res.status(400).json({ 'message': 'Username and password are required.' })
        try {
            // encrypt the password
            const hashedPwd = await bcrypt.hash(password, 10);
            // store the new user
            const newUser = new db.User
            newUser.userName = userName;
            newUser.password = hashedPwd;
            newUser.save((err) => {
                if (err) {
                    console.log('error', err)
                    res.status(400).json({ 'message': 'Username taken.' });
                } else {
                    res.json({ 'success': `New user ${userName} created!` });
                };
            });
        } catch (err) {
            res.status(500).json({ 'message': err.message });
        }
    },
    findAll: (req, res) => {
        db.User.find((err, users) => {
            if (err) {
                res.send(err);
            } else {
                res.send(users);
            };
        });
    }
}