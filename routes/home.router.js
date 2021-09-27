const express = require("express");
const router = express.Router();

router.route("/").get((req, res, next) => {
  res.send({ msg: "d" });
});

module.exports = router;
