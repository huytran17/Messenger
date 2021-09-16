const User = require("../models/user.model");
const {
  HttpResponse,
  HttpResponseError,
} = require("../utils/Response/http.response");
const { ValidationMessage } = require("../constants/app.constant");
const { HttpStatus } = require("../constants/app.constant");
const { emailExistsValidator } = require("../utils/Validators/auth.validator");
const { changePwdValidator } = require("../utils/Validators/pwd.validator");

module.exports = async (req, res, next) => {
  const { email } = { ...req.body };

  const { error } = changePwdValidator(email);

  if (error)
    return HttpResponseError(res, HttpStatus.BAD_REQUEST, error.details);

  const { emailExists } = await emailExistsValidator(email);

  if (!emailExists)
    return HttpResponseError(
      res,
      HttpStatus.BAD_REQUEST,
      ValidationMessage.USER_NOT_FOUND
    );

  next();
};
