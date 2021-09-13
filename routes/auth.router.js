const express = require("express");
const router = express.Router();
const {
  create,
  register,
  login,
  getLogin,
  logout,
} = require("../controllers/auth.controller");

router.route("/register").get(create).post(register);
router.route("/login").get(getLogin).post(login);
router.route("/logout").post(logout);

module.exports = router;
