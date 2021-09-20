const User = require("../../models/user.model");
const {
  emailExistsValidator,
  comparePwdValidator,
  loginValidator,
} = require("../../utils/Validators/auth/auth.validator");
const { HttpResponseError } = require("../../utils/Response/http.response");
const { HttpStatus, ResponseMessage } = require("../../constants/app.constant");

module.exports._validateData = async (req, res, next) => {
  const data = { ...req.body } || { ...req.decoded };
  //validate date
  const { error } = loginValidator(data);

  if (error)
    return HttpResponseError(res, HttpStatus.BAD_REQUEST, error.details);

  next();
};

module.exports._validateEmail = async (req, res, next) => {
  const data = { ...req.body } || { ...req.decoded };
  //is email exists?
  const _emailExists = await emailExistsValidator(data.email);

  if (!_emailExists)
    return HttpResponseError(
      res,
      HttpStatus.BAD_REQUEST,
      ResponseMessage.INCORRECT_EMAIL
    );

  next();
};

module.exports._validatePwd = async (req, res, next) => {
  const data = { ...req.body } || { ...req.decoded };

  let user = await User.findEmail(data.email);
  //validate password
  let isPassed = await comparePwdValidator(data.password, user.password);

  if (!isPassed)
    return HttpResponseError(
      res,
      HttpStatus.BAD_REQUEST,
      ResponseMessage.INCORRECT_PASSWORD
    );

  next();
};