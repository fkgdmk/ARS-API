const dotenv = require('dotenv');
dotenv.config();

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.indexOf('Basic') > -1) {
        const token = authHeader.split(' ')[1];
        const apiKey = process.env.API_KEY;
        if (token === apiKey) {
            return next();
        } else {
            return res.status(401).send();
        }

    } else {
        return res.status(401).send();
    }
}

module.exports = verifyToken;