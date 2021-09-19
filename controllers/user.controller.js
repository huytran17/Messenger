const User = require("../models/user.model");
const {
  HttpResponse,
  HttpResponseError,
} = require("../utils/Response/http.response");
const { HttpStatus } = require("../constants/app.constant");

module.exports.getAll = async (req, res) => {
  try {
    let users = await User.find({}).exec();

    if (users.length) return HttpResponse(res, HttpStatus.OK, users);
    else return HttpResponse(res, HttpStatus.NO_CONTENT);
  } catch (err) {
    return HttpResponseError(res, HttpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

module.exports.getById = async (req, res) => {
  try {
    const { id } = { ...req.params };

    let user = await User.findById(id).exec();

    if (user) return HttpResponse(res, HttpStatus.OK, user);
    else return HttpResponse(res, HttpStatus.NO_CONTENT);
  } catch (err) {
    return HttpResponseError(res, HttpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

module.exports.updateInfo = async (req, res) => {
  try {
    const { id } = req.params;

    const data = { ...req.body };

    let user = await User.findOneAndUpdate({ _id: id }, data, {
      new: true,
    }).exec();

    return HttpResponse(res, HttpStatus.CREATED, user);
  } catch (err) {
    return HttpResponseError(res, HttpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

module.exports.updateAvatar = async (req, res) => {
  try {
    const { id } = { ...req.params };

    const file = await req.source.toString("base64");

    const avatar_photo_path = new Buffer.from(file, "base64");

    const user = await User.findByIdAndUpdate(
      id,
      { avatar_photo_path },
      { new: true }
    ).exec();

    return HttpResponse(res, HttpStatus.CREATED, user);
  } catch (err) {
    return HttpResponseError(res, HttpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

module.exports.destroy = async (req, res) => {
  try {
    const { id } = req.params;

    let user = await User.findByIdAndDelete(id).exec();

    return HttpResponse(res, HttpStatus.OK, user);
  } catch (err) {
    return HttpResponseError(res, HttpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

//TODO create join and leave conversation for user

module.exports.joinConversation = async (req, res) => {};

module.exports.leaveConversation = async (req, res) => {};

module.exports.joinGroup = async (req, res) => {};

module.exports.leaveGruop = async (req, res) => {};
