const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader) return res.status(401); // unauthorized
    console.log(authHeader); // Bearer token
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token, 
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) return res.status(403); // forbidden, received token, but something isnt right, tampered with
            console.log('req user: ', req.user)
            req.userName = decoded.user;
            next();
        }
    );
}

module.exports = verifyJWT