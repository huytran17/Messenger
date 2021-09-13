const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const {
  registerValidator,
  emailExistsValidator,
  comparePwdValidator,
  loginValidator,
} = require("../utils/Validators/auth.validator");
const {
  HttpResponse,
  HttpResponseError,
} = require("../utils/Response/http.response");
const { HttpStatus, ResponseMessage } = require("../constants/app.constant");
const _CONF = require("../config/app");

module.exports.create = (req, res) => {
  return res.render("auth/register");
};

module.exports.getLogin = (req, res) => {
  return res.render("auth/login");
};

module.exports.register = async (req, res) => {
  const data = { ...req.body };

  //validate data
  const { error } = registerValidator(req.body);

  if (error)
    return HttpResponseError(res, HttpStatus.BAD_REQUEST, error.details);
  //is email already registered?
  const _emailExists = await emailExistsValidator(data.email);

  if (_emailExists)
    return HttpResponseError(
      res,
      HttpStatus.BAD_REQUEST,
      ResponseMessage.EMAIL_ALREADY_EXISTS
    );

  try {
    //store user to db
    let user = await new User(data).save();

    return HttpResponse(res, HttpStatus.CREATED, user);
  } catch (err) {
    return HttpResponseError(res, HttpStatus.BAD_REQUEST, err.message);
  }
};

module.exports.login = async (req, res) => {
  const data = { ...req.body } || { ...req.decoded };
  //validate date
  const { error } = loginValidator(data);

  if (error)
    return HttpResponseError(res, HttpStatus.BAD_REQUEST, error.details);
  //is email exists?
  const _emailExists = await emailExistsValidator(data.email);

  if (_emailExists) {
    //get user
    let user = await User.findEmail(data.email);
    //validate password
    let isPassed = await comparePwdValidator(data.password, user.password);

    if (isPassed) {
      //craete token
      const token = jwt.sign({ user }, _CONF.TOKEN_SECRET);

      if (data.remember_me === "true")
        //store token to cookie
        await res.cookie("token", token, { signed: true });
      //store token to session
      req.session.token = token;

      return HttpResponse(res, HttpStatus.OK, user);
    } else
      return HttpResponseError(
        res,
        HttpStatus.BAD_REQUEST,
        ResponseMessage.INCORRECT_PASSWORD
      );
  } else
    return HttpResponseError(
      res,
      HttpStatus.BAD_REQUEST,
      ResponseMessage.INCORRECT_EMAIL
    );
};

module.exports.logout = async (req, res) => {
  //clear session
  await req.session.destroy((err) => {
    if (err)
      return HttpResponseError(res, HttpStatus.INTERNAL_SERVER_ERROR, err);
  });
  //clear cookie
  await res.clearCookie("token");

  return res.redirect("/auth/login");
};
