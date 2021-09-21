const {
  storeTextValidator,
} = require("../../utils/Validators/message/message.validator");
const { HttpResponseError } = require("../../utils/Response/http.response");
const { verifyUploadFile } = require("../file/verify.middleware");
const { HttpStatus } = require("../../constants/app.constant");

module.exports.verifyStore = async (req, res, next) => {
  const { onModel, uid, mid } = req.params;

  const { content } = req.body;

  const { error } = storeTextValidator({ onModel, uid, mid, content });

  if (error)
    return HttpResponseError(res, HttpStatus.BAD_REQUEST, error.details);

  next();
};

module.exports.verifyStoreFile = async (req, res, next) => {
  verifyUploadFile(req, res, next, "file_path", 1048576);
};
