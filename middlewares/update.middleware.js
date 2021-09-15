const { HttpResponseError } = require("../utils/Response/http.response");
const { emailExistsValidator } = require("../utils/Validators/auth.validator");
const { HttpStatus, ResponseMessage } = require("../constants/app.constant");
const sendMail = require("../utils/Mailer/mailgun");
const _CONF = require("../config/app");
const pug = require("pug");
const otp = require("otp-generator");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

module.exports.verifyEmail = async (req, res, next) => {
  let { email } = { ...req.body };
  //get current logged in user's id
  let uid = await req.decoded.user._id;

  var user = await User.findById(uid).exec();

  //if the new email is not equals the current logged in user's email (changed)
  if (user.email !== email) {
    let _emailExists = await emailExistsValidator(email);

    //if the new email already exists
    if (_emailExists)
      return HttpResponseError(
        res,
        HttpStatus.BAD_REQUEST,
        ResponseMessage.EMAIL_ALREADY_EXISTS
      );
    else {
      //generate opt code
      const verifyCode = otp.generate(6, {
        alphabets: false,
        upperCase: false,
        specialChars: false,
      });

      //make view for mail
      const html = pug.renderFile(
        `${__dirname}/../views/mail/verifyToken.pug`,
        {
          verifyCode,
        }
      );

      //set up the mail's data
      let data = {
        from: _CONF.MAIL_FROM,
        to: email,
        replyTo: _CONF.MAIL_FROM,
        subject: _CONF.MAIL_ONCHANGE_SUBJECT,
        html: html,
      };

      sendMail(data, next);

      //encode the verify email code and  set to cookie
      // const verifyToken = jwt.sign({ user, verifyCode }, _CONF.TOKEN_SECRET);

      // let expires = new Date(
      //   new Date().getTime() + _CONF.COOKIE_VERIFY_EXPIRES
      // );

      // await res.cookie("verifyToken", verifyToken, {
      //   signed: true,
      //   expires: expires,
      // });
    }
  }

  next();
};
