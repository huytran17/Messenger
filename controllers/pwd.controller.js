const User = require("../models/user.model");
const sendMail = require("../utils/mailer/mailgun");
const jwt = require("jsonwebtoken");
const _CONF = require("../config/app");
const otp = require("otp-generator");
const pug = require("pug");
const {
  HttpResponse,
  HttpResponseError,
} = require("../utils/Response/http.response");
const { HttpStatus, ResponseMessage } = require("../constants/app.constant");

module.exports.forgetPwd = async (req, res) => {
  return res.render("auth/pwd/forget");
};

module.exports.changePwdEmail = async (req, res, next) => {
  const { email } = { ...req.query };

  const user = await User.findEmail(email);

  const otpCode = otp.generate(6, {
    alphabets: false,
    upperCase: false,
    specialChars: false,
  });

  const verifyToken = jwt.sign({ user, otpCode }, _CONF.TOKEN_SECRET);

  let expires = new Date(new Date().getTime() + _CONF.COOKIE_VERIFY_EXPIRES);

  await res.cookie("verifyToken", verifyToken, {
    signed: true,
    expires: expires,
  });

  //send email
  //get mail's view
  let html = pug.renderFile(`${__dirname}/../views/mail/verifyToken.pug`, {
    pretty: true,
    otpCode,
  });

  const data = {
    from: _CONF.MAIL_FROM,
    to: email,
    subject: _CONF.MAIL_ONCHANGE_SUBJECT,
    html: html,
  };

  sendMail(data, next);

  return HttpResponse(res, HttpStatus.OK, ResponseMessage.MAIL_SENT);
};

module.exports.verifyCode = async (req, res) => {
  const verifyToken = req.signedCookies.verifyToken;

  const { code } = { ...req.body };

  if (verifyToken) {
    jwt.verify(verifyToken, _CONF.TOKEN_SECRET, (err, decoded) => {
      if (err)
        return HttpResponseError(res, HttpStatus.UNAUTHORIZED_ACCESS, err);

      if (code == decoded.otpCode) return res.render("auth/pwd/reset");
      else
        return HttpResponseError(
          res,
          HttpStatus.BAD_REQUEST,
          ResponseMessage.VERIFY_CODE_INVALID
        );
    });
  } else
    return HttpResponseError(
      res,
      HttpStatus.BAD_REQUEST,
      ResponseMessage.VERIFY_CODE_INVALID
    );
};

module.exports.resetPwd = async (req, res, next) => {
  const { email, password } = { ...req.body };

  const user = await User.findEmail(email);

  try {
    let _user = await User.findByIdAndUpdate(
      user._id,
      { password },
      { new: true }
    ).exec();

    await res.clearCookie("verifyToken");

    return HttpResponse(res, HttpStatus.OK, _user);
  } catch (err) {
    return HttpResponseError(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      ResponseMessage.INTERNAL_SERVER_ERROR
    );
  }
};
