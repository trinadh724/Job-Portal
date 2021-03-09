const jwt = require('jsonwebtoken');


module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).send({
            msg: ' No token'
        });
    }
    try {

        decoded = jwt.verify(token, "mySecret");
        req.user = decoded.user;

        // console.log(req.user.who);
        next();
    } catch (err) {
        res.status(401).json({
            msg: 'token is not valid'
        });
    }
}