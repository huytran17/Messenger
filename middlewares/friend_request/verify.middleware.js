const { HttpResponseError } = require("../../utils/Response/http.response");
const { HttpStatus } = require("../../constants/app.constant");
const {
  storeValidator,
} = require("../../utils/Validators/friend_request/friendRequest.validator");

module.exports.verifyStore = (req, res, next) => {
  const { error } = storeValidator(req.body);

  if (error)
    return HttpResponseError(res, HttpStatus.BAD_REQUEST, error.details);

  next();
};
