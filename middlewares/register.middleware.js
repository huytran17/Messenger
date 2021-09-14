const { HttpResponseError } = require("../utils/Response/http.response");
const { HttpStatus, ResponseMessage } = require("../constants/app.constant");
const {
  registerValidator,
  emailExistsValidator,
} = require("../utils/Validators/auth.validator");

module.exports.r_validateData = async (req, res, next) => {
  //validate data
  const { error } = registerValidator(req.body);

  if (error)
    return HttpResponseError(res, HttpStatus.BAD_REQUEST, error.details);

  next();
};

module.exports.r_validateEmail = async (req, res, next) => {
  const { email } = { ...req.body };
  //is email already registered?
  const _emailExists = await emailExistsValidator(email);

  if (_emailExists)
    return HttpResponseError(
      res,
      HttpStatus.BAD_REQUEST,
      ResponseMessage.EMAIL_ALREADY_EXISTS
    );

  next();
};
