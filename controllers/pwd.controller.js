const User = require("../models/user.model");
const sendMail = require("../utils/mailer/mailgun");
const jwt = require("jsonwebtoken");
const _CONF = require("../config/app");
const otp = require("otp-generator");
const pug = require("pug");
const url = require("url");
const {
  HttpResponse,
  HttpResponseError,
} = require("../utils/Response/http.response");
const {
  HttpStatus,
  ResponseMessage,
  Path,
} = require("../constants/app.constant");

module.exports.changePwdEmail = async (req, res, next) => {
  const { email } = { ...req.body };

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

  const verifyUrl = `${_CONF.CLIENT_URL}:${_CONF.CLIENT_PORT}/auth/verify-code`;

  //send email
  //get mail's view
  let html = pug.renderFile(`${__dirname}/../views/mail/verifyToken.pug`, {
    pretty: true,
    otpCode,
    verifyUrl,
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
        return HttpResponseError(
          res,
          HttpStatus.UNAUTHORIZED_ACCESS,
          ResponseMessage.VERIFY_CODE_INVALID,
          Path.VERIFY_CODE
        );

      if (code == decoded.otpCode) return HttpResponse(res, HttpStatus.OK);
      else
        return HttpResponseError(
          res,
          HttpStatus.BAD_REQUEST,
          ResponseMessage.VERIFY_CODE_INVALID,
          Path.VERIFY_CODE
        );
    });
  } else
    return HttpResponseError(
      res,
      HttpStatus.BAD_REQUEST,
      ResponseMessage.VERIFY_CODE_INVALID,
      Path.VERIFY_CODE
    );
};

module.exports.resetPassword = async (req, res, next) => {
  const { email, password } = { ...req.body };

  const verifyToken = req.signedCookies.verifyToken;

  if (verifyToken) {
    jwt.verify(verifyToken, _CONF.TOKEN_SECRET, async (err, decoded) => {
      if (err)
        return HttpResponseError(
          res,
          HttpStatus.UNAUTHORIZED_ACCESS,
          ResponseMessage.VERIFY_CODE_INVALID,
          Path.VERIFY_CODE
        );

      try {
        const user = await User.findEmail(email);

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
    });
  } else
    return HttpResponseError(
      res,
      HttpStatus.BAD_REQUEST,
      ResponseMessage.VERIFY_CODE_INVALID,
      Path.VERIFY_CODE
    );
};
