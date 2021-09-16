const User = require("../models/user.model");
const {
  HttpResponse,
  HttpResponseError,
} = require("../utils/Response/http.response");
const { ValidationMessage } = require("../constants/app.constant");
const { HttpStatus } = require("../constants/app.constant");
const { emailExistsValidator } = require("../utils/Validators/auth.validator");
const { changePwdValidator } = require("../utils/Validators/pwd.validator");
const mailer = require("../utils/mailer/mailgun");
const jwt = require("jsonwebtoken");
const _CONF = require("../config/app");
const otp = require("otp-generator");
const pug = require("pug");

module.exports.forgetPwd = async (req, res) => {
  return res.render("auth/pwd/forget");
};

module.exports.changePwd = async (req, res) => {
  const { email } = { ...req.body };

  const { error } = changePwdValidator(email);

  if (error)
    return HttpResponseError(res, HttpStatus.BAD_REQUEST, error.details);

  const { emailExists } = emailExistsValidator(email);

  if (!emailExists)
    return HttpResponseError(
      res,
      HttpStatus.BAD_REQUEST,
      ValidationMessage.USER_NOT_FOUND
    );

  const otpCode = await otp.generate(6, {
    alphabets: false,
    upperCase: false,
    specialChars: false,
  });

  const verifyToken = jwt.sign({ _id, otpCode }, _CONF.TOKEN_SECRET);

  let expires = new Date(new Date().getTime() + _CONF.COOKIE_VERIFY_EXPIRES);

  await res.cookie("verifyToken", verifyToken, {
    signed: true,
    expires: expires,
  });

  //send email
  //get mail's view
  let html = await pug.renderFile(
    `${__dirname}/../views/mail/verifyToken.pug`,
    { pretty: true },
    {
      verifyCode,
    }
  );

  const data = {
    from: _CONF.MAIL_FROM,
    to: email,
  };
  //TODO send reset pwd email to user
};

module.exports.resetPwd = async (req, res) => {};
