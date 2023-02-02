const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    handleLogin: async(req, res) => {
        const { userName, password } = req.body
        if (!userName || !password) return res.sendStatus(400).json({ 'message': 'Username and password are required.'})
        try {
            db.User.find(async (err, users) => {
                if(err) { 
                    res.send({ 'message': 'db.User.find isnt working'}, err);
                } else {
                    const foundUser = users.find(person => person.userName === userName);
                    if (!foundUser) return res.status(400).send({ 'message': 'Unauthorized' }) // Unauthorized if we dont find the user
                    
                    const match = await bcrypt.compare(password, foundUser.password)
                    res.json({ foundUser, match })
                }
            })
        } catch(err) {
            res.status(500).json({ 'message': err.message })
        }
    }
}