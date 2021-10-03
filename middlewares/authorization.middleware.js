const { HttpResponseError } = require("../utils/Response/http.response");
const { HttpStatus, ResponseMessage } = require("../constants/app.constant");
const User = require("../models/user.model");

module.exports.isAdmin = async (req, res, next) => {
  if (req.decoded) {
    const user = await User.findById(req.decoded.uid).exec();

    return user.role === 1
      ? next()
      : HttpResponseError(res, HttpStatus.FORBIDDEN, ResponseMessage.FORBIDDEN);
  }
};

module.exports.isMod = async (req, res, next) => {
  if (req.decoded) {
    const user = await User.findById(req.decoded.uid).exec();

    return user.role === 2
      ? next()
      : HttpResponseError(res, HttpStatus.FORBIDDEN, ResponseMessage.FORBIDDEN);
  }
};
