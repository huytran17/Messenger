const express = require("express");
const router = express.Router();
const {
  validateData,
  validateEmail,
} = require("../middlewares/auth/register.middleware");
const {
  _validateData,
  _validateEmail,
  _validatePwd,
} = require("../middlewares/auth/login.middleware");
const { register, login, logout } = require("../controllers/auth.controller");

router.route("/register").post(validateData, validateEmail, register);

router.route("/login").post(_validateData, _validateEmail, _validatePwd, login);

router.route("/logout").post(logout);

module.exports = router;
