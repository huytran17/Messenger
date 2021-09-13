const express = require("express");
const router = express.Router();
const {
  getAll,
  edit,
  update,
  _delete,
} = require("../controllers/user.controller");

router.route("/").get(getAll);
router.route("/:id").get(edit).patch(update).delete(_delete);

module.exports = router;
