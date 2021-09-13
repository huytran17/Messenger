const express = require("express");
const router = express.Router();
const {
  create,
  register,
  login,
  getLogin,
} = require("../controllers/auth.controller");

router.route("/register").get(create).post(register);
router.route("/login").get(getLogin).post(login);

module.exports = router;
