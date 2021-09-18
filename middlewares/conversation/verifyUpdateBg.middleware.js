const { HttpResponseError } = require("../../utils/Response/http.response");
const { HttpStatus } = require("../../constants/app.constant");
const mimeVaildator = require("../../utils/Validators/image/mime.validator");
const { ValidationMessage } = require("../../constants/app.constant");
// const mv = require("mv");
const formidable = require("formidable");

module.exports = async (req, res, next) => {
  const form = formidable.IncomingForm();

  await form.parse(req, (err, fields, files) => {
    if (files && files.background_photo.size) {
      let source = files.background_photo.path;
      // let target = `${__dirname}/../../public/uploads/conversations/${files.background_photo.name}`;

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

      //   mv(source, target, (err) => {
      //     if (err)
      //       return HttpResponseError(res, HttpStatus.BAD_REQUEST, err.stack);

      //     req.target = target;

      //     next();
      //   });

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
