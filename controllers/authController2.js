const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    handleLogin: async(req, res) => {
        const { userName, password } = req.body
        try {
            db.User.find(async (err, users) => {
                if(err) { 
                    res.send({ 'message': 'db.user.find isnt working'}, err);
                } else {
                    const foundUser = users.find(person => person.userName === userName)
                    res.json({ foundUser })
                }
            })
        } catch(err) {
            res.status(500).json({ 'message': err.message })
        }
    }
}