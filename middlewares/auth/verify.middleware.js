const { HttpResponseError } = require("../../utils/Response/http.response");
const { HttpStatus, ResponseMessage } = require("../../constants/app.constant");
const { emailExistsValidator } = require("../../utils/Validators/auth/auth.validator");
const { changePwdValidator } = require("../../utils/Validators/auth/pwd.validator");
const { resetPwdValidator } = require("../../utils/Validators/auth/pwd.validator");

module.exports.verifyChangePwdEmail = async (req, res, next) => {
  const { email } = { ...req.query };

  const { error } = changePwdValidator({ email });

  if (error)
    return HttpResponseError(res, HttpStatus.BAD_REQUEST, error.details);

  const emailExists = await emailExistsValidator(email);

  if (!emailExists)
    return HttpResponseError(
      res,
      HttpStatus.BAD_REQUEST,
      ResponseMessage.USER_NOT_FOUND
    );

  next();
};

module.exports.verifyResetPwd = async (req, res, next) => {
    const data = { ...req.body };
  
    const _emailExists = await emailExistsValidator(data.email);
  
    if (!_emailExists)
      return HttpResponseError(
        res,
        HttpStatus.BAD_REQUEST,
        ResponseMessage.INCORRECT_EMAIL
      );
  
    const { error } = resetPwdValidator(data);
  
    if (error)
      return HttpResponseError(res, HttpStatus.BAD_REQUEST, error.details);
  
    next();
  };