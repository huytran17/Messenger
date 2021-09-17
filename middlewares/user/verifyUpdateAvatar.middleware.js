const { HttpResponseError } = require("../../utils/Response/http.response");
const { HttpStatus } = require("../../constants/app.constant");
const updateAvatarValidator = require("../../utils/Validators/updateAvatar.validator");
const formidable = require("formidable");
const mv = require("mv");
const { ValidationMessage } = require("../../constants/app.constant");

module.exports = async (req, res, next) => {
  const form = formidable.IncomingForm();

  await form.parse(req, (err, fields, files) => {
    if (files.avatar.size) {
      let source = files.avatar.path,
        target = `${__dirname}/../public/uploads/users/${files.avatar.name}`;

      const validateResult = updateAvatarValidator(source);

      //check mime type
      if (!validateResult.ok)
        return HttpResponseError(
          res,
          HttpStatus.BAD_REQUEST,
          ValidationMessage.MIME_TYPE
        );

      //check file size: <=5MB
      if (files.avatar.size > 5242880)
        return HttpResponseError(
          res,
          HttpStatus.BAD_REQUEST,
          ValidationMessage.AVATAR_SIZE
        );

      mv(source, target, (err) => {
        if (err)
          return HttpResponseError(res, HttpStatus.BAD_REQUEST, err.stack);

        req.target = target;

        next();
      });
    } else
      return HttpResponseError(
        res,
        HttpStatus.BAD_REQUEST,
        ValidationMessage.REQUIRED
      );
  });
};
