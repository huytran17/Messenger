const express = require("express");
const router = express.Router();
const {
  getAll,
  edit,
  updateInfo,
  _delete,
} = require("../controllers/user.controller");
const {
  verifyUpdateInfo,
} = require("../middlewares/verifyUpdateInfo.middleware");

router.route("/").get(getAll);

router
  .route("/:id")
  .get(edit)
  .patch(verifyUpdateInfo, updateInfo)
  .delete(_delete);

module.exports = router;
