const express = require("express");
const router = express.Router();
const { getAll, getById } = require("../controllers/user.controller");

router.route("/").get(getAll);
router.route("/:userId").get(getById);

module.exports = router;
