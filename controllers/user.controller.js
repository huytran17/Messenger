const User = require("../models/user.model");
const {
  HttpResponse,
  HttpResponseError,
} = require("../utils/Response/http.response");
const { emailExistsValidator } = require("../utils/Validators/auth.validator");
const { HttpStatus, ResponseMessage } = require("../constants/app.constant");

module.exports.getAll = async (req, res) => {
  try {
    let users = await User.find({}).exec();

    return HttpResponse(res, HttpStatus.OK, users);
  } catch (err) {
    return HttpResponseError(res, HttpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

module.exports.edit = async (req, res) => {
  const { id } = req.params;

  try {
    let user = await User.findById(id).exec();

    return HttpResponse(res, HttpStatus.OK, user);
  } catch (err) {
    return HttpResponseError(res, HttpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

module.exports.update = async (req, res) => {
  const { id } = req.params;

  const data = { ...req.body };

  try {
    let u = await User.findById(id, "email").exec();

    if (u.email !== data.email) {
      const _emailExists = await emailExistsValidator(data.email);

      if (_emailExists)
        return HttpResponseError(
          res,
          HttpStatus.BAD_REQUEST,
          ResponseMessage.EMAIL_ALREADY_EXISTS
        );
    }

    let user = await User.findByIdAndUpdate(id, data, { new: true }).exec();

    return HttpResponse(res, HttpStatus.CREATED, user);
  } catch (err) {
    return HttpResponseError(res, HttpStatus.BAD_REQUEST, err);
  }
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
