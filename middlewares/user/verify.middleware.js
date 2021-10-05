const { HttpResponseError } = require("../../utils/Response/http.response");
const {
  HttpStatus,
  FileUpload,
  Path,
} = require("../../constants/app.constant");
const {
  updateInfoValidator,
  updatePasswordValidator,
} = require("../../utils/Validators/user/user.validator");
const { verifyUpload } = require("../file/verify.middleware");
const bcrypt = require("bcryptjs");
const User = require("../../models/user.model");

module.exports.verifyUpdateAvatar = async (req, res, next) => {
  verifyUpload(req, res, next, "avatar_photo", FileUpload.IMAGE_MAX_SIZE);
};

module.exports.verifyUpdateCover = async (req, res, next) => {
  verifyUpload(req, res, next, "cover_photo", FileUpload.IMAGE_MAX_SIZE);
};

module.exports.verifyUpdateInfo = async (req, res, next) => {
  const { error } = updateInfoValidator(req.body);

  if (error)
    return HttpResponseError(
      res,
      HttpStatus.BAD_REQUEST,
      error.details[0].message,
      error.details[0].path[0]
    );

  next();
};

module.exports.verifyUpdatePassword = async (req, res, next) => {
  let uid = req.decoded.uid;

  let user = await User.findById(uid).exec();

  let isPassed = await bcrypt.compare(req.body.password, user.password);

  if (!isPassed)
    return HttpResponseError(
      res,
      HttpStatus.BAD_REQUEST,
      ResponseMessage.INCORRECT_PASSWORD,
      Path.PASSWORD
    );

  const { error } = updatePasswordValidator(req.body);

  if (error)
    return HttpResponseError(
      res,
      HttpStatus.BAD_REQUEST,
      error.details[0].message,
      error.details[0].path[0]
    );

  next();
};
