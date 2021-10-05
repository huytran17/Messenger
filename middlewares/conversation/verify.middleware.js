const { HttpResponseError } = require("../../utils/Response/http.response");
const { HttpStatus, FileUpload } = require("../../constants/app.constant");
const {
  storeValidator,
  updateInfoValidator,
} = require("../../utils/Validators/conversation/conversation.validator");
const { verifyUpload } = require("../file/verify.middleware");

module.exports.verifyStore = (req, res, next) => {
  const { error } = storeValidator(req.body);

  if (error)
    return HttpResponseError(res, HttpStatus.BAD_REQUEST, error.details);

  next();
};

module.exports.verifyUpdateBackground = async (req, res, next) => {
  verifyUpload(req, res, next, "background_photo", FileUpload.IMAGE_MAX_SIZE);
};

module.exports.verifyUpdateInfo = (req, res, next) => {
  const { error } = updateInfoValidator(req.body);

  if (error)
    return HttpResponseError(res, HttpStatus.BAD_REQUEST, error.details);

  next();
};
