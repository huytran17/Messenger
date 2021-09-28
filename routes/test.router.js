const express = require("express");
const router = express.Router();

router.route("/").get((req, res, next) => {
  res.send("cookie: " + req.cookies.token);
});

module.exports = router;
