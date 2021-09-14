const {
  HttpResponse,
  HttpResponseError,
} = require("../utils/Response/http.response");
const { emailExistsValidator } = require("../utils/Validators/auth.validator");
const { HttpStatus, ResponseMessage } = require("../constants/app.constant");
const mailer = require("nodemailer");

module.exports.verifyEmail = async (req, res, next) => {
  const data = { ...req.body };

  let u = await req.decoded.user;

  if (u.email !== data.email) {
    const _emailExists = await emailExistsValidator(data.email);

    if (_emailExists)
      return HttpResponseError(
        res,
        HttpStatus.BAD_REQUEST,
        ResponseMessage.EMAIL_ALREADY_EXISTS
      );
  }

  next();
};

module.exports.sendVerifyEmail = (req, res, next) => {
  next();
};
