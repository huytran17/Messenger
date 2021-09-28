const { HttpResponseError } = require("../../utils/Response/http.response");
const {
  HttpStatus,
  ResponseMessage,
  Path,
} = require("../../constants/app.constant");
const {
  registerValidator,
} = require("../../utils/Validators/auth/auth.validator");
const User = require("../../models/user.model");

module.exports.validateData = async (req, res, next) => {
  //validate data
  const { error } = registerValidator(req.body);

  if (error)
    return HttpResponseError(
      res,
      HttpStatus.BAD_REQUEST,
      error.details[0].message,
      error.details[0].path[0]
    );

  next();
};

module.exports.validateEmail = async (req, res, next) => {
  const { email } = { ...req.body };
  //is email already registered?
  const _emailExists = await User.emailExists(email);

  if (_emailExists)
    return HttpResponseError(
      res,
      HttpStatus.BAD_REQUEST,
      ResponseMessage.EMAIL_ALREADY_EXISTS,
      Path.EMAIL
    );

  next();
};
