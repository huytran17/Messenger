const express = require("express");
const router = express.Router();

router.route("/").get((req, res, next) => {
  res.render("client/home.pug");
});

module.exports = router;