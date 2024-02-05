const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers['authorization']; // รับ token จาก headers

    if (!token) {
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    }

    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }

        // ถ้า token ถูกต้องให้เรียกใช้ middleware ต่อไป
        req.userId = decoded.id;
        next();
    });
}

module.exports = verifyToken;
