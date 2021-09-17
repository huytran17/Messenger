const express = require("express");
const router = express.Router();
const {
  getAll,
  edit,
  updateInfo,
  updateAvatar,
  _delete,
} = require("../controllers/user.controller");
const verifyUpdateInfo = require("../middlewares/user/verifyUpdateInfo.middleware");
const verifyUpdateAvatar = require("../middlewares/user/verifyUpdateAvatar.middleware");

router.route("/").get(getAll);

router
  .route("/:id")
  .get(edit)
  .post(verifyUpdateAvatar, updateAvatar)
  .patch(verifyUpdateInfo, updateInfo)
  .delete(_delete);

module.exports = router;
