const User = require("../models/user.model");
const registerValidator = require("../utils/Validators/register.validator");
const emailExistsValidator = require("../utils/Validators/emailExists.validator");
const comparePwdValidator = require("../utils/Validators/comparePwd.validator");
const {
  HttpResponse,
  HttpResponseError,
} = require("../utils/Response/http.response");
const { HttpStatus, ResponseMessage } = require("../constants/app.constant");

module.exports.create = (req, res) => {
  return res.render("user/register");
};

module.exports.register = async (req, res) => {
  const data = { ...req.body };

  //validate
  const { error } = registerValidator(req.body);

  if (error)
    return HttpResponseError(res, HttpStatus.BAD_REQUEST, error.details);

  const _emailExists = await emailExistsValidator(data.email);

  if (_emailExists)
    return HttpResponseError(
      res,
      HttpStatus.BAD_REQUEST,
      ResponseMessage.EMAIL_ALREADY_EXISTS
    );

  try {
    let user = await new User(data).save();

    return HttpResponse(res, HttpStatus.CREATED, user);
  } catch (err) {
    return HttpResponseError(res, HttpStatus.BAD_REQUEST, err.message);
  }
};

module.exports.login = async (req, res) => {
  const data = { ...req.body };
  const _emailExists = await emailExistsValidator(data.email);

  let user = await User.findEmail(data.email);

  let isPassed = await comparePwdValidator(data.password, user.password);
  
  if (_emailExists && isPassed) {
    return HttpResponse(res, HttpStatus.OK, user);
  } else
    return HttpResponseError(
      res,
      HttpStatus.BAD_REQUEST,
      ResponseMessage.INCORRECT_USER
    );
};
