const { HttpResponseError } = require("../../utils/Response/http.response");
const { HttpStatus } = require("../../constants/app.constant");
const mimeVaildator = require("../../utils/Validators/image/mime.validator");
const { ValidationMessage } = require("../../constants/app.constant");
const formidable = require("formidable");
const fs = require("fs");

module.exports = async (req, res, next) => {
  const form = formidable.IncomingForm();

  await form.parse(req, (err, fields, files) => {
    if (files && files.background_photo) {
      let source = files.background_photo.path;

      const validateMIME = mimeVaildator(source);

      if (!validateMIME.ok)
        return HttpResponseError(
          res,
          HttpStatus.BAD_REQUEST,
          ValidationMessage.MIME_TYPE
        );

      if (files.background_photo.size > 1048576)
        return HttpResponseError(
          res,
          HttpStatus.BAD_REQUEST,
          ValidationMessage.BACKGROUND_SIZE
        );

      req.source = fs.readFileSync(source);

      next();
    } else
      return HttpResponseError(
        res,
        HttpStatus.BAD_REQUEST,
        ValidationMessage.REQUIRED
      );
  });
};
