const express = require("express");
const router = express.Router();
const {
  getAll,
  edit,
  update,
  _delete,
} = require("../controllers/user.controller");
const {
  verifyEmail,
  sendVerifyEmail,
} = require("../middlewares/update.middleware");

router.route("/").get(getAll);
router
  .route("/:id")
  .get(edit)
  .patch(verifyEmail, sendVerifyEmail, update)
  .delete(_delete);

module.exports = router;
