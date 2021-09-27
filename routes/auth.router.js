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
const {
  create,
  register,
  _login,
  logout,
} = require("../controllers/auth.controller");

router
  .route("/register")
  .get(create)
  .post(validateData, validateEmail, register);

router
  .route("/login")
  .post(_validateData, _validateEmail, _validatePwd, _login);

router.route("/logout").post(logout);

module.exports = router;
