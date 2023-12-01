const jwt = require('jsonwebtoken');
require('dotenv').config()

const createCookieToken = async (req, res) => {
    const user = req.body;
    // console.log(user);
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" })
    res
        .cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        })
        .send({ success: true })
}

module.exports = createCookieToken