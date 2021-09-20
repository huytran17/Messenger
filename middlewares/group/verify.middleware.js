const { HttpResponseError } = require("../../utils/Response/http.response");
const { HttpStatus } = require("../../constants/app.constant");
const updateInfoValidator = require("../../utils/Validators/group/updateInfo.validator");
const storeValidator = require("../../utils/Validators/group/store.validator");
const { verifyUploadImage } = require("../image/verify.middleware");

module.exports.verifyStore = (req, res, next) => {
  const { error } = storeValidator(req.body);

  if (error)
    return HttpResponseError(res, HttpStatus.BAD_REQUEST, error.details);

  next();
};

module.exports.verifyUpdateBackground = async (req, res, next) => {
  verifyUploadImage(req, res, next, "background_photo", 1048576);
};

module.exports.verifyUpdateInfo = (req, res, next) => {
  const { error } = updateInfoValidator(req.body);

  if (error)
    return HttpResponseError(res, HttpStatus.BAD_REQUEST, error.details);

  next();
};
