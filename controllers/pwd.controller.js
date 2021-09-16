const sendMail = require("../utils/mailer/mailgun");
const jwt = require("jsonwebtoken");
const _CONF = require("../config/app");
const otp = require("otp-generator");
const pug = require("pug");

module.exports.forgetPwd = async (req, res) => {
  return res.render("auth/pwd/forget");
};

module.exports.changePwd = async (req, res) => {
  const otpCode = otp.generate(6, {
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
  let html = pug.renderFile(
    `${__dirname}/../views/mail/verifyToken.pug`,
    { pretty: true },
    {
      verifyCode,
    }
  );

  const data = {
    from: _CONF.MAIL_FROM,
    to: email,
    subject: _CONF.MAIL_ONCHANGE_SUBJECT,
    html: html,
  };

  sendMail(data, next);
};

module.exports.resetPwd = async (req, res) => {};
