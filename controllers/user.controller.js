const User = require("../models/user.model");
const {
  HttpResponse,
  HttpResponseError,
} = require("../utils/Response/http.response");
const { HttpStatus } = require("../constants/app.constant");

module.exports.getAll = async (req, res) => {
  try {
    let users = await User.getAll();

    if (users.length) return HttpResponse(res, HttpStatus.OK, users);

    return HttpResponse(res, HttpStatus.NO_CONTENT);
  } catch (err) {
    return HttpResponseError(res, HttpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

module.exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    let user = await User.getById(id);

    if (user) return HttpResponse(res, HttpStatus.OK, user);

    return HttpResponse(res, HttpStatus.NO_CONTENT);
  } catch (err) {
    return HttpResponseError(res, HttpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

module.exports.getByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    let user = await User.getByEmail(email);

    if (user) return HttpResponse(res, HttpStatus.OK, user);

    return HttpResponse(res, HttpStatus.NO_CONTENT);
  } catch (err) {
    return HttpResponseError(res, HttpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

module.exports.updateInfo = async (req, res) => {
  try {
    const { id } = req.params;

    const data = { ...req.body };

    let user = await User.updateInfo(id, data);

    return HttpResponse(res, HttpStatus.CREATED, user);
  } catch (err) {
    return HttpResponseError(res, HttpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

module.exports.updateAvatar = async (req, res) => {
  try {
    const { id } = req.params;

    const avatar_photo = await req.source.toString("base64");

    let user = await User.updateAvatar(id, avatar_photo);

    return HttpResponse(res, HttpStatus.CREATED, user);
  } catch (err) {
    return HttpResponseError(res, HttpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

module.exports.updateCover = async (req, res) => {
  try {
    const { id } = req.params;

    const cover_photo = req.source.toString("base64");

    let user = await User.updateCover(id, cover_photo);

    return HttpResponse(res, HttpStatus.CREATED, user);
  } catch (err) {
    return HttpResponseError(res, HttpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

module.exports.destroy = async (req, res) => {
  try {
    const { id } = req.params;

    let user = await User.destroy(id);

    return HttpResponse(res, HttpStatus.OK, user);
  } catch (err) {
    return HttpResponseError(res, HttpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

module.exports.unfriend = async (req, res) => {
  try {
    const { id, fid } = req.body;

    let user = await User.unfriend(id, fid);

    await User.unfriend(fid, id);

    return HttpResponse(res, HttpStatus.OK, user);
  } catch (err) {
    return HttpResponseError(res, HttpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

//TODO create join and leave conversation for user
//TODO delete friend
