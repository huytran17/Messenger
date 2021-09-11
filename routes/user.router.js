const express = require("express");
const router = express.Router();
const { getAll, getById } = require("../controllers/user.controller");

router.get("/", getAll);
router.route("/:userid").get(getById);

module.exports = router;
