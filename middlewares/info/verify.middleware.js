const {
  storeValidator,
  updateValidator,
} = require("../../utils/Validators/info/info.validator.js");
const { HttpResponseError } = require("../../utils/Response/http.response");
const { HttpStatus } = require("../../constants/app.constant");

module.exports.verifyStore = async (req, res, next) => {
  const { error } = storeValidator(req.body);

  if (error)
    return HttpResponseError(res, HttpStatus.BAD_REQUEST, error.details);

  next();
};

module.exports.verifyupdate = async (req, res, next) => {
  const { error } = updateValidator(req.body);

  if (error)
    return HttpResponseError(res, HttpStatus.BAD_REQUEST, error.details);

  next();
};
