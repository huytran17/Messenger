const express = require("express");
const router = express.Router();
const {
  getAll,
  getById,
  store,
  updateBackground,
  updateInfo,
  destroy,
} = require("../controllers/conversation.controller");
const verifyUpdateBackground = require("../middlewares/conversation/verifyUpdateBackground.middleware");
const verifyUpdateInfo = require("../middlewares/conversation/verifyUpdateInfo.middleware");
const verifyStore = require("../middlewares/conversation/verifyStore.middleware");

router.route("/").get(getAll).post(verifyStore, store);

router
  .route("/:id")
  .get(getById)
  .patch(verifyUpdateBackground, updateBackground)
  .put(verifyUpdateInfo, updateInfo)
  .delete(destroy);

module.exports = router;
