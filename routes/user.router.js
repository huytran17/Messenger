const express = require("express");
const router = express.Router();
const { getAll } = require("../controllers/user.controller");

router.get("/", getAll);

module.exports = router;
