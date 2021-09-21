const express = require("express");
const router = express.Router();
const {
  verifyStore,
  verifyStoreFile,
} = require("../middlewares/message/verify.middleware");
const {
  store,
  getByModelId,
  destroy,
  storeUploadFile,
} = require("../controllers/message.controller");

router
  .route("/:onModel/:uid/:mid")
  .post(verifyStore, store)
  .put(verifyStoreFile, storeUploadFile);

router.route("/:mid").get(getByModelId);

router.route("/:id").delete(destroy);

module.exports = router;
