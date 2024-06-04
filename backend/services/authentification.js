require('dotenv').config();
const jwt = require('jsonwebtoken');

function authentificateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null)
        return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, response) => { // Corrected here
        if (err)
            return res.status(403).json({ message: "Forbidden" });

        res.locals = response;
        next();
    });
}

module.exports = { authentificateToken: authentificateToken };
