const express = require("express");
const router = express.Router();
const {
  getAll,
  getById,
  updateInfo,
  updateAvatar,
  updateCover,
  destroy,
} = require("../controllers/user.controller");
const {
  verifyUpdateInfo,
  verifyUpdateAvatar,
  verifyUpdateCover,
} = require("../middlewares/user/verify.middleware");
const { isAdmin } = require("../middlewares/authorization.middleware");

router.route("/").get(getAll);

router
  .route("/:id")
  .get(getById)
  .post(verifyUpdateAvatar, updateAvatar)
  .put(verifyUpdateCover, updateCover)
  .patch(verifyUpdateInfo, updateInfo)
  .delete(isAdmin, destroy);

module.exports = router;
