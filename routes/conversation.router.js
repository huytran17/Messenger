const express = require("express");
const router = express.Router();
const {
  getAll,
  getById,
  store,
} = require("../controllers/conversation.controller");

router.route("/").get(getAll).post(store);

router.route("/:id").get(getById);

module.exports = router;
