const jws = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (request, response, next) => {
    const token = request.body.token || request.query.token || request.headers['x-access-token'];

    if (!token) {
        return response.status(403).json({ message: ' Token is required' });
    }
    try {
        const decoded = jws.verify(token, process.env.JWT_TOKEN_KEY);
        request.user = decoded;
    } catch (error) {
        return response.status(401).json({ message: 'ًWrong Token' });
    }
    return next();
}

module.exports = verifyToken;