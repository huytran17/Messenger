const User = require("../models/user.model");
const {
  HttpResponse,
  HttpResponseError,
} = require("../utils/Response/http.response");
const HttpStatus = require("../constants/app.constant");

module.exports.getAll = async (req, res) => {
  try {
    const users = await User.find({}).exec();
    if (users.length) return HttpResponse(res, HttpStatus.OK, users);
    return HttpResponse(res, HttpStatus.NO_CONTENT);
  } catch (err) {
    return HttpResponseError(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};

module.exports.getById = async (req, res) => {
  const { userid } = req.params;
  try {
    const user = await User.findOne({ _id: userid }).exec();
    if (user) return HttpResponse(res, HttpStatus.OK, user);
    return HttpResponse(res, HttpStatus.NO_CONTENT);
  } catch (err) {
    return HttpResponseError(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};
