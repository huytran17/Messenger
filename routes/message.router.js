const express = require("express");
const router = express.Router();
const {
  verifyStore,
  verifyStoreFile,
} = require("../middlewares/message/verify.middleware");
const {
  store,
  getAll,
  destroy,
  storeUploadFile,
} = require("../controllers/message.controller");

router
  .route("/:onModel/:uid/:mid")
  .get(getAll)
  .post(verifyStore, store)
  .put(verifyStoreFile, storeUploadFile);

router.route("/:id").delete(destroy);

module.exports = router;
