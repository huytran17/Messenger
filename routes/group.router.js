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
const verifyStore = require("../middlewares/group/verifyStore.middleware");

router.route("/").get(getAll).post(verifyStore, store);

router
  .route("/:id")
  .get(getById)
  .patch(verifyUpdateBackground, updateBackground)
  .put(verifyUpdateInfo, updateInfo)
  .delete(destroy);

router.route("/:gid/:uid").put(add).post(kick);

module.exports = router;
