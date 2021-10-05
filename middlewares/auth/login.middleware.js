const User = require("../../models/user.model");
const {
  loginValidator,
} = require("../../utils/Validators/auth/auth.validator");
const { HttpResponseError } = require("../../utils/Response/http.response");
const {
  HttpStatus,
  ResponseMessage,
  Path,
} = require("../../constants/app.constant");
const bcrypt = require("bcryptjs");

module.exports._validateData = async (req, res, next) => {
  const data = { ...req.body };

  //validate date
  let { error } = loginValidator(data);

  if (error) {
    return HttpResponseError(
      res,
      HttpStatus.BAD_REQUEST,
      error.details[0].message,
      error.details[0].path[0]
    );
  }

  next();
};

module.exports._validateEmail = async (req, res, next) => {
  const data = { ...req.body };
  //is email exists?
  let _emailExists = await User.emailExists(data.email);

  if (!_emailExists)
    return HttpResponseError(
      res,
      HttpStatus.BAD_REQUEST,
      ResponseMessage.INCORRECT_EMAIL,
      Path.EMAIL
    );

  next();
};

module.exports._validatePwd = async (req, res, next) => {
  const data = { ...req.body };

  let user = await User.findEmail(data.email);
  //validate password
  let isPassed = await bcrypt.compare(data.password, user.password);

  if (!isPassed)
    return HttpResponseError(
      res,
      HttpStatus.BAD_REQUEST,
      ResponseMessage.INCORRECT_PASSWORD,
      Path.PASSWORD
    );

  next();
};
