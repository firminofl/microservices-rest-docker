require("dotenv-safe").config()
const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next) {
    let token = req.headers['token'];

    if (!token) return res.status(401).send({
        auth: false,
        message: 'No token provided.'
    });

    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) {
            console.log('Failed to authenticate token.')
            return res.status(500).send({
                auth: false,
                message: 'Failed to authenticate token.'
            });
        }
        // se tudo estiver ok, salva no request para uso posterior
        req.userId = decoded.id;
        next();
    });
}

module.exports = {
    verifyJWT
}