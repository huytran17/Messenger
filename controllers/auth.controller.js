const User = require("../models/user.model");
const {
  HttpResponse,
  HttpResponseError,
} = require("../utils/Response/http.response");
const { HttpStatus } = require("../constants/app.constant");

module.exports.create = (req, res) => {
  return res.render("auth/register");
};

module.exports.login = (req, res) => {
  return res.render("auth/login");
};

module.exports.register = async (req, res) => {
  const data = { ...req.body };

  try {
    let user = await new User(data).save();

    return HttpResponse(res, HttpStatus.CREATED, user);
  } catch (err) {
    return HttpResponseError(res, HttpStatus.BAD_REQUEST, err.message);
  }
};

module.exports.logout = async (req, res) => {
  await req.session.destroy((err) => {
    if (err)
      return HttpResponseError(res, HttpStatus.INTERNAL_SERVER_ERROR, err);
  });

  await res.clearCookie("token");

  return res.redirect("/auth/login");
};
