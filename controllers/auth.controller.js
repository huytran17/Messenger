const User = require("../models/user.model");
const registerValidator = require("../utils/validators/register.validator");
const emailExistsValidator = require("../utils/validators/emailExists.validator");
const {
  HttpResponse,
  HttpResponseError,
} = require("../utils/Response/http.response");
const { HttpStatus } = require("../constants/app.constant");

module.exports.create = (req, res) => {
  return res.render("user/register");
};

module.exports.register = async (req, res) => {
  const data = { ...req.body };

  //validate
  const { error } = registerValidator(req.body);

  if (error)
    return HttpResponseError(
      res,
      HttpStatus.BAD_REQUEST,
      error.details[0].message
    );

  const _emailExists = await emailExistsValidator(data.email);
  if (_emailExists)
    return HttpResponseError(
      res,
      HttpStatus.BAD_REQUEST,
      "error.details[0].message"
    );

  const user = new User(data);

  try {
    let newUser = await user.save();
    delete newUser.password;

    return HttpResponse(res, HttpStatus.CREATED, newUser);
  } catch (err) {
    return HttpResponseError(res, HttpStatus.BAD_REQUEST, err.message);
  }
};
