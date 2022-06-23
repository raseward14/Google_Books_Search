const db = require('../models')

module.exports = {
    create: (req, res) => {
        // POST a User to (http://localhost:8000/api/register)
        const newUser = new db.User
        newUser.userName = req.body.userName;
        newUser.password = req.body.password;
        newUser.save((err) => {
            if(err) {
                res.send(err);
            } else {
                res.json({ message: 'User registered: ', newUser});
            };
        });
    }
}