const { HttpResponseError } = require("../../utils/Response/http.response");
const { HttpStatus, ResponseMessage } = require("../../constants/app.constant");
const {
  registerValidator,
} = require("../../utils/Validators/auth/auth.validator");

module.exports.validateData = async (req, res, next) => {
  //validate data
  const { error } = registerValidator(req.body);

  if (error)
    return HttpResponseError(res, HttpStatus.BAD_REQUEST, error.details);

  next();
};

module.exports.validateEmail = async (req, res, next) => {
  const { email } = { ...req.body };
  //is email already registered?
  const _emailExists = await User.emailExists(data.email);

  if (_emailExists)
    return HttpResponseError(
      res,
      HttpStatus.BAD_REQUEST,
      ResponseMessage.EMAIL_ALREADY_EXISTS
    );

  next();
};
