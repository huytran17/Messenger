const express = require("express");
const router = express.Router();
const {
  forgetPwd,
  changePwdEmail,
  verifyCode,
  resetPwd,
} = require("../controllers/pwd.controller");
const { verifyAccess } = require("../middlewares/verifyAccess.middleware");
const verifyChangePwdEmail = require("../middlewares/verifyChangePwdEmail.middleware");

router
  .route("/")
  .get(forgetPwd)
  .post(verifyAccess, verifyChangePwdEmail, changePwdEmail)
  .put(verifyAccess, verifyCode)
  .patch(verifyAccess, resetPwd);

module.exports = router;
