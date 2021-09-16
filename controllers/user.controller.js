const User = require("../models/user.model");
const {
  HttpResponse,
  HttpResponseError,
} = require("../utils/Response/http.response");
const { HttpStatus } = require("../constants/app.constant");
const multer = require("multer");

module.exports.getAll = async (req, res) => {
  try {
    let users = await User.find({}).exec();

    return HttpResponse(res, HttpStatus.OK, users);
  } catch (err) {
    return HttpResponseError(res, HttpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

module.exports.edit = async (req, res) => {
  try {
    let user = await req.decoded.user;

    return HttpResponse(res, HttpStatus.OK, user);
  } catch (err) {
    return HttpResponseError(res, HttpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

module.exports.updateInfo = async (req, res) => {
  const { id } = req.params;

  const data = { ...req.body };

  try {
    let user = await User.findOneAndUpdate({ _id: id }, data, {
      new: true,
    }).exec();

    return HttpResponse(res, HttpStatus.CREATED, user);
  } catch (err) {
    return HttpResponseError(res, HttpStatus.BAD_REQUEST, err);
  }
};

module.exports.updateAvatar = async (req, res) => {
  const upload = multer({ dest: "../public/uploads/users" });
};

module.exports._delete = async (req, res) => {
  const { id } = req.params;

  try {
    let user = await User.findByIdAndDelete(id).exec();

    return HttpResponse(res, HttpStatus.OK, user);
  } catch (err) {
    return HttpResponseError(res, HttpStatus.BAD_REQUEST, err);
  }
};

module.exports.changePwd = async (req, res) => {};
module.exports.resetPwd = async (req, res) => {};
module.exports.forgetPwd = async (req, res) => {};
