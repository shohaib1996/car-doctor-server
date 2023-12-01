
const jwt = require('jsonwebtoken')

require('dotenv').config()

const verifyToken = async (req, res, next) => {
    const token = req.cookies?.token;
    console.log("token token", token );
    if (!token) {
        return res.status(401).send({ message: "not authorized" })
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(401).send({ message: "unauthorized access" })
        }
        console.log("value in token", decoded);
        req.user = decoded
        next()
    })
}

module.exports = verifyToken