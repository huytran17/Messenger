const formidable = require("formidable");
const fs = require("fs");
const { HttpResponseError } = require("../../utils/Response/http.response");
const { HttpStatus } = require("../../constants/app.constant");
const {
  validateImageMIME,
} = require("../../utils/Validators/image/mime.validator");
const { ValidationMessage } = require("../../constants/app.constant");

module.exports.verifyUploadImage = (req, res, next, name, size) => {
  const form = formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (files && files[name]) {
      const source = files[name].path;

      const validateMime = validateImageMIME(source);

      if (!validateMime.ok)
        return HttpResponseError(
          res,
          HttpStatus.BAD_REQUEST,
          ValidationMessage.MIME_TYPE
        );

      if (files[name].size > size)
        return HttpResponseError(
          res,
          HttpStatus.BAD_REQUEST,
          ValidationMessage.IMAGE_SIZE
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
