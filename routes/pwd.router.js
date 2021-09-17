const express = require("express");
const router = express.Router();
const {
  forgetPwd,
  changePwdEmail,
  verifyCode,
  resetPwd,
} = require("../controllers/pwd.controller");
const verifyChangePwdEmail = require("../middlewares/verifyChangePwdEmail.middleware");
const verifyResetPwd = require("../middlewares/verifyResetPwd.middleware");

router
  .route("/")
  .get(forgetPwd)
  .post(verifyChangePwdEmail, changePwdEmail)
  .put(verifyCode)
  .patch(verifyResetPwd, resetPwd);

module.exports = router;
