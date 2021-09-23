const User = require("../models/user.model");
const {
  HttpResponse,
  HttpResponseError,
} = require("../utils/Response/http.response");
const { HttpStatus } = require("../constants/app.constant");
const jwt = require("jsonwebtoken");
const _CONF = require("../config/app");

module.exports.create = (req, res) => {
  return res.render("auth/register");
};

module.exports.login = (req, res) => {
  return res.render("auth/login");
};

module.exports._login = async (req, res) => {
  const data = { ...req.body };

  let user = await User.findEmail(data.email);

  //craete token
  const token = jwt.sign({ user }, _CONF.TOKEN_SECRET);

  if (data.remember_me === "true") {
    let expires = new Date(new Date().getTime() + _CONF.COOKIE_TOKEN_EXPIRES);

    await res.cookie("token", token, {
      signed: true,
      expires: expires,
    });
  } else await res.clearCookie("token");

  req.session.token = token;

  return HttpResponse(res, HttpStatus.OK, user);
};

module.exports.register = async (req, res) => {
  try {
    const data = { ...req.body };

    let user = await new User(data).save();

    return HttpResponse(res, HttpStatus.CREATED, user);
  } catch (err) {
    return HttpResponseError(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
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
