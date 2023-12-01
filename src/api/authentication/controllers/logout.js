

const logout = async (req, res) => {
    const user = req.body;
    console.log("user logged out", user);
    res
        .clearCookie("token", { maxAge: 0 })
        .send({ success: true })
}

module.exports = logout