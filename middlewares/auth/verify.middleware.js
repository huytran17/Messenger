const { HttpResponseError } = require("../../utils/Response/http.response");
const {
  HttpStatus,
  ResponseMessage,
  Path,
} = require("../../constants/app.constant");
const {
  changePwdValidator,
  resetPwdValidator,
} = require("../../utils/Validators/auth/auth.validator");
const User = require("../../models/user.model");

module.exports.verifyChangePwdEmail = async (req, res, next) => {
  const { email } = { ...req.body };

  const { error } = changePwdValidator({ email });

  if (error)
    return HttpResponseError(
      res,
      HttpStatus.BAD_REQUEST,
      error.details[0].message,
      error.details[0].path[0]
    );

  const emailExists = await User.emailExists(email);

  if (!emailExists)
    return HttpResponseError(
      res,
      HttpStatus.BAD_REQUEST,
      ResponseMessage.USER_NOT_FOUND,
      Path.EMAIL
    );

  next();
};

module.exports.verifyResetPwd = async (req, res, next) => {
  const data = { ...req.body };

  const _emailExists = await User.emailExists(data.email);

  if (!_emailExists)
    return HttpResponseError(
      res,
      HttpStatus.BAD_REQUEST,
      ResponseMessage.INCORRECT_EMAIL,
      Path.EMAIL
    );

  const { error } = resetPwdValidator(data);

  if (error)
    return HttpResponseError(
      res,
      HttpStatus.BAD_REQUEST,
      error.details[0].message,
      error.details[0].path[0]
    );

  next();
};
