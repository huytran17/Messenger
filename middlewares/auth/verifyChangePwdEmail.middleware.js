const { HttpResponseError } = require("../../utils/Response/http.response");
const { HttpStatus, ResponseMessage } = require("../../constants/app.constant");
const { emailExistsValidator } = require("../../utils/Validators/auth.validator");
const { changePwdValidator } = require("../../utils/Validators/pwd.validator");

module.exports = async (req, res, next) => {
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
