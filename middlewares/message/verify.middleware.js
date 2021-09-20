const storeValidator = require("../../utils/Validators/message/store.validator");
const { HttpResponseError } = require("../../utils/Response/http.response");
const { HttpStatus } = require("../../constants/app.constant");

module.exports.verifyStore = async (req, res, next) => {
  const { onModel, uid, mid } = req.params;

  const { content } = req.body;

  const { error } = storeValidator({ onModel, uid, mid, content });

  if (error)
    return HttpResponseError(res, HttpStatus.BAD_REQUEST, error.details);

  next();
};
