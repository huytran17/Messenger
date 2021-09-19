const { HttpResponseError } = require("../../utils/Response/http.response");
const { HttpStatus } = require("../../constants/app.constant");
const updateInfoValidator = require("../../utils/Validators/conversation/updateInfo.validator");

module.exports = (req, res, next) => {
  const { error } = updateInfoValidator(req.body);

  if (error)
    return HttpResponseError(res, HttpStatus.BAD_REQUEST, error.details);

  next();
};
