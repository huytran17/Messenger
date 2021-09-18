const express = require("express");
const router = express.Router();
const {
  getAll,
  getById,
  updateInfo,
  updateAvatar,
  _delete,
} = require("../controllers/user.controller");
const verifyUpdateInfo = require("../middlewares/user/verifyUpdateInfo.middleware");
const verifyUpdateAvatar = require("../middlewares/user/verifyUpdateAvatar.middleware");
const { isAdmin } = require("../middlewares/authorization.middleware");

router.route("/").get(getAll);

router
  .route("/:id")
  .get(getById)
  .post(verifyUpdateAvatar, updateAvatar)
  .patch(verifyUpdateInfo, updateInfo)
  .delete(isAdmin, _delete);

module.exports = router;
