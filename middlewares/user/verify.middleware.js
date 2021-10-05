const { HttpResponseError } = require("../../utils/Response/http.response");
const { HttpStatus, FileUpload } = require("../../constants/app.constant");
const {
  updateInfoValidator,
} = require("../../utils/Validators/user/user.validator");
const { verifyUpload } = require("../file/verify.middleware");

module.exports.verifyUpdateAvatar = async (req, res, next) => {
  verifyUpload(req, res, next, "avatar_photo", FileUpload.IMAGE_MAX_SIZE);
};

module.exports.verifyUpdateCover = async (req, res, next) => {
  verifyUpload(req, res, next, "cover_photo", FileUpload.IMAGE_MAX_SIZE);
};

module.exports.verifyUpdateInfo = async (req, res, next) => {
  const { error } = updateInfoValidator(req.body);

  if (error)
    return HttpResponseError(res, HttpStatus.BAD_REQUEST, error.details);

  next();
};
