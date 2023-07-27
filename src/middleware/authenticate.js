const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token)
        return res.status(401).send({
            success: false,
            error: 'Access denied. No token provided.',
            payload: null
        });

    try {
        req.user = jwt.verify(token, config.get('jwt.privateKey'));
        next();
    } catch (ex) {
        return res.status(400).send({
            success: false,
            error: 'Invalid token.',
            payload: null
        });
    }
}

module.exports = auth;
