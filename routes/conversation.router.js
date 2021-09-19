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
const {
  verifyUpdateBackground,
  verifyUpdateInfo,
  verifyStore,
} = require("../middlewares/conversation/verify.middleware");

router.route("/").get(getAll).post(verifyStore, store);

router
  .route("/:id")
  .get(getById)
  .patch(verifyUpdateBackground, updateBackground)
  .put(verifyUpdateInfo, updateInfo)
  .delete(destroy);

module.exports = router;
