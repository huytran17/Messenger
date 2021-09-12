const express = require("express");
const router = express.Router();
const { create, register } = require("../controllers/auth.controller");

router.route("/register").get(create).post(register);

module.exports = router;
