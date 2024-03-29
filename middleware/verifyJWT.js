const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader) return res.status(401); // unauthorized
    console.log(authHeader); // Bearer token
    const token = authHeader.split(' ')[1];
    console.log(token);
    jwt.verify(
        token, 
        process.env.REACT_APP_ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) {
                console.log(err)
                return res.sendStatus(403); // forbidden, received token, but something isnt right, tampered with
            } else {
                req.user = decoded.userName;
                console.log('req user: ', req.user)
                next();
            }
        }
    );
}

module.exports = verifyJWT