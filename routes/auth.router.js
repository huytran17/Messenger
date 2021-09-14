const express = require("express");
const router = express.Router();
const {
  r_validateData,
  r_validateEmail,
} = require("../middlewares/register.middleware");
const {
  l_validateData,
  l_validateEmail,
  l_validatePwd,
} = require("../middlewares/login.middleware");
const {
  create,
  register,
  login,
  logout,
} = require("../controllers/auth.controller");

router
  .route("/register")
  .get(create)
  .post(r_validateData, r_validateEmail, register);

router
  .route("/login")
  .get(login)
  .post(l_validateData, l_validateEmail, l_validatePwd);

router.route("/logout").post(logout);

module.exports = router;
