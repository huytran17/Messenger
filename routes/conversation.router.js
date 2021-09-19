const express = require("express");
const router = express.Router();
const {
  getAll,
  getById,
  store,
  updateBackground,
  updateInfo,
  kick,
  add,
} = require("../controllers/conversation.controller");
const verifyUpdateBackground = require("../middlewares/conversation/verifyUpdateBackground.middleware");
const verifyUpdateInfo = require("../middlewares/conversation/verifyUpdateInfo.middleware");

router.route("/").get(getAll).post(store);

router
  .route("/:id")
  .get(getById)
  .patch(verifyUpdateBackground, updateBackground)
  .put(verifyUpdateInfo, updateInfo);

router.route("/:cid/:uid").put(add).post(kick);

module.exports = router;
