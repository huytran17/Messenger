const express = require("express");
const router = express.Router();
const {
  forgetPwd,
  changePwd,
  resetPwd,
} = require("../controllers/pwd.controller");
const { verifyAccess } = require("../middlewares/verifyAccess.middleware");
const verifyChangePwd = require("../middlewares/verifyChangePwd.middleware");

router
  .route("/")
  .get(forgetPwd)
  .post(verifyAccess, verifyChangePwd, changePwd)
  .patch(resetPwd);

module.exports = router;
