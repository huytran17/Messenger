const express = require("express");
const router = express.Router();
const {
  forgetPwd,
  changePwd,
  resetPwd,
} = require("../controllers/pwd.controller");

router.route("/").get(forgetPwd).post(changePwd).patch(resetPwd);

module.exports = router;
