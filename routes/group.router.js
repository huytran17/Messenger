const express = require("express");
const router = express.Router();
const {
  getAll,
  getById,
  store,
  updateBackground,
  updateInfo,
  destroy,
  kick,
  add,
} = require("../controllers/group.controller");
const verifyUpdateBackground = require("../middlewares/group/verifyUpdateBackground.middleware");
const verifyUpdateInfo = require("../middlewares/group/verifyUpdateInfo.middleware");

router.route("/").get(getAll);

router
  .route("/:id")
  .get(getById)
  .patch(verifyUpdateBackground, updateBackground)
  .put(verifyUpdateInfo, updateInfo);

router.route("/:gid/:uid").put(add).post(kick);

module.exports = router;
