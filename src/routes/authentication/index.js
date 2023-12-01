const express = require("express");
const { createCookieToken, logout } = require("../../api/authentication/controllers");
// const createCookieToken = require("../../api/authentication/controllers/createCookieToken");
// const logout = require("../../api/authentication/controllers/logout");
const router = express.Router();

router.post("/jwt", createCookieToken)
router.post("/logout", logout)

module.exports = router
