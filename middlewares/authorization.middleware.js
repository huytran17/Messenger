const {
  HttpResponse,
  HttpResponseError,
} = require("../utils/Response/http.response");
const { HttpStatus, ResponseMessage } = require("../constants/app.constant");

module.exports.isAdmin = (req, res, next) => {
  if (req.decoded)
    return req.decoded.user.role === 1
      ? next()
      : HttpResponseError(res, HttpStatus.FORBIDDEN, ResponseMessage.FORBIDDEN);
};
module.exports.isMod = (req, res, next) => {};
module.exports.isMe = (req, res, next) => {};
