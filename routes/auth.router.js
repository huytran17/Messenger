const express = require("express");
const router = express.Router();
const { create, register, login } = require("../controllers/auth.controller");

router.route("/register").get(create).post(register);
router.route("/login").post(login);

module.exports = router;
