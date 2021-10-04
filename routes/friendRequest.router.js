const express = require("express");
const router = express.Router();
const {
  getByReceiver,
  getBySender,
  store,
  accept,
  decline,
} = require("../controllers/friend_request.controller");
const {
  verifyStore,
} = require("../middlewares/friend_request/verify.middleware");

router.route("/sender").get(getBySender);

router.route("/receiver").get(getByReceiver);

router.route("/").post(verifyStore, store).patch(accept).delete(decline);

module.exports = router;
