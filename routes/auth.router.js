const express = require("express");
const router = express.Router();
const {
  validateData,
  validateEmail,
} = require("../middlewares/register.middleware");
const {
  _validateData,
  _validateEmail,
  _validatePwd,
} = require("../middlewares/login.middleware");
const {
  create,
  register,
  login,
  _login,
  logout,
} = require("../controllers/auth.controller");

router
  .route("/register")
  .get(create)
  .post(validateData, validateEmail, register);

router
  .route("/login")
  .get(login)
  .post(_validateData, _validateEmail, _validatePwd, _login);

router.route("/logout").post(logout);

module.exports = router;
