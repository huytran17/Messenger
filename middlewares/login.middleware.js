const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const _CONF = require("../config/app");
const {
  emailExistsValidator,
  comparePwdValidator,
  loginValidator,
} = require("../utils/Validators/auth.validator");
const {
  HttpResponse,
  HttpResponseError,
} = require("../utils/Response/http.response");
const { HttpStatus, ResponseMessage } = require("../constants/app.constant");

module.exports.l_validateData = async (req, res, next) => {
  const data = { ...req.body } || { ...req.decoded };
  //validate date
  const { error } = loginValidator(data);

  if (error)
    return HttpResponseError(res, HttpStatus.BAD_REQUEST, error.details);
  next();
};

module.exports.l_validateEmail = async (req, res, next) => {
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

module.exports.l_validatePwd = async (req, res) => {
  const data = { ...req.body } || { ...req.decoded };

  let user = await User.findEmail(data.email);
  //validate password
  let isPassed = await comparePwdValidator(data.password, user.password);

  if (isPassed) {
    //craete token
    const token = jwt.sign({ user }, _CONF.TOKEN_SECRET);

    if (data.remember_me === "true")
      await res.cookie("token", token, { signed: true });
    else await res.clearCookie("token");

    req.session.token = token;

    return HttpResponse(res, HttpStatus.OK, user);
  } else
    return HttpResponseError(
      res,
      HttpStatus.BAD_REQUEST,
      ResponseMessage.INCORRECT_PASSWORD
    );
};
