const express = require("express");
const router = express.Router();
const {
  getAll,
  getById,
  store,
  update,
} = require("../controllers/conversation.controller");
const verifyUpdateBg = require("../middlewares/conversation/verifyUpdateBg.middleware");

router.route("/").get(getAll).post(store);

router.route("/:id").get(getById).patch(verifyUpdateBg, update);

module.exports = router;
