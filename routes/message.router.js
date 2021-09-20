const express = require("express");
const router = express.Router();
const { verifyStore } = require("../middlewares/message/verify.middleware");
const { store, getAll, destroy } = require("../controllers/message.controller");

router.route("/:onModel/:uid/:mid").get(getAll).post(verifyStore, store);

router.route("/:id").delete(destroy);

module.exports = router;
