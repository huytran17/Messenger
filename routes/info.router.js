const express = require("express");
const router = express.Router();
const {
  getInfo,
  store,
  update,
  destroy,
} = require("../controllers/info.controller");

router.route("/:uid/:mid").get(getInfo).put(update);

router.route("/:onModel/:uid/:mid").post(store);

router.route("/:id").delete(destroy);

module.exports = router;
