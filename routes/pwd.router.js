const express = require("express");
const router = express.Router();
const {
  changePwdEmail,
  verifyCode,
  resetPassword: resetPassword,
} = require("../controllers/pwd.controller");
const {
  verifyChangePwdEmail,
  verifyResetPwd,
} = require("../middlewares/auth/verify.middleware");

router.route("/forget-password").post(verifyChangePwdEmail, changePwdEmail);

router.route("/verify-code").post(verifyCode);

router.route("/reset-password").patch(verifyResetPwd, resetPassword);

module.exports = router;
