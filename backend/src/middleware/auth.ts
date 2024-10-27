const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

function authenticateToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(401).send({ error: { error_code: 2, msg: "Unauthorized" } });
        
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send({ error: { error_code: 3, msg: "Forbidden" } });
        req.user = user;
        next();
    });
}
function adminToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(401).send({ error: { error_code: 4, msg: "Unauthorized" } });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send({ error: { error_code: 5, msg: "Forbidden" } });
        if (user.privilege < 5) return res.status(403).send({ error: { error_code: 6, msg: "Forbidden" } });
        req.user = user;
        next();
    });
}
function createToken(res, info) {
    res.cookie('token', jwt.sign(info, process.env.JWT_SECRET));
    return jwt.sign(info, process.env.JWT_SECRET);
}
function removeToken(res) {
    res.clearCookie('token');
}

module.exports = { authenticateToken, adminToken, createToken, removeToken };
