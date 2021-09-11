const express = require("express");
const router = express.Router();
const { create } = require("../controllers/auth.controller");

router.get("/register", create);

module.exports = router;
