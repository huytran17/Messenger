const { HttpResponseError } = require("../../utils/Response/http.response");
const { HttpStatus, ResponseMessage } = require("../../constants/app.constant");
const { resetPwdValidator } = require("../../utils/Validators/auth/pwd.validator");
const { emailExistsValidator } = require("../../utils/Validators/auth/auth.validator");

module.exports = async (req, res, next) => {
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
