const express = require("express");
const router = express.Router();
const {
  getAll,
  edit,
  updateInfo,
  updateAvatar,
  _delete,
} = require("../controllers/user.controller");
const verifyUpdateInfo = require("../middlewares/verifyUpdateInfo.middleware");
const verifyUpdateAvatar = require("../middlewares/verifyUpdateAvatar.middleware");

router.route("/").get(getAll);

router
  .route("/:id")
  .get(edit)
  .post(verifyUpdateAvatar, updateAvatar)
  .patch(verifyUpdateInfo, updateInfo)
  .delete(_delete);

module.exports = router;
