const express = require("express");
const router = express.Router();
const {
  getAll,
  getById,
  getByEmail,
  updateInfo,
  updateAvatar,
  updateCover,
  destroy,
  unfriend,
  updatePassword,
} = require("../controllers/user.controller");
const {
  verifyUpdateInfo,
  verifyUpdateAvatar,
  verifyUpdateCover,
  verifyUpdatePassword,
} = require("../middlewares/user/verify.middleware");
const { isAdmin } = require("../middlewares/authorization.middleware");

router
  .route("/")
  .get(getAll)
  .delete(unfriend)
  .patch(verifyUpdatePassword, updatePassword);

router
  .route("/:id")
  .get(getById)
  .post(verifyUpdateAvatar, updateAvatar)
  .put(verifyUpdateCover, updateCover)
  .patch(verifyUpdateInfo, updateInfo)
  .delete(isAdmin, destroy);

router.route("/:email").get(getByEmail);

module.exports = router;
