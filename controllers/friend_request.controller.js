const User = require("../models/user.model");
const FrRequest = require("../models/friend_request.model");
const {
  HttpResponse,
  HttpResponseError,
} = require("../utils/Response/http.response");
const { HttpStatus } = require("../constants/app.constant");
const jwt = require("jsonwebtoken");
const _CONF = require("../config/app");

module.exports.getByReceiver = async (req, res) => {
  try {
    const { id } = req.body;

    const frqs = await FrRequest.find({ receiver: id }, "-receiver")
      .populate("sender", "username friends avatar_photo cover_photo")
      .exec();

    if (frqs.length) return HttpResponse(res, HttpStatus.OK, frqs);

    return HttpResponse(res, HttpStatus.NO_CONTENT);
  } catch (err) {
    return HttpResponseError(res, HttpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

module.exports.getBySender = async (req, res) => {
  try {
    const { id } = req.body;

    const frqs = await FrRequest.find({ sender: id }, "-sender")
      .populate("receiver", "username friends avatar_photo cover_photo")
      .exec();

    if (frqs.length) return HttpResponse(res, HttpStatus.OK, frqs);

    return HttpResponse(res, HttpStatus.NO_CONTENT);
  } catch (err) {
    return HttpResponseError(res, HttpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

module.exports.accept = async (req, res) => {
  try {
    const { sender, receiver } = req.body;

    const user = await FrRequest.accept(sender, receiver);

    return HttpResponse(res, HttpStatus.OK, user);
  } catch (err) {
    return HttpResponseError(res, HttpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

module.exports.decline = async (req, res) => {
  try {
    const { sender, receiver } = req.body;

    const user = await FrRequest.decline(sender, receiver);

    return HttpResponse(res, HttpStatus.OK, user);
  } catch (err) {
    return HttpResponseError(res, HttpStatus.INTERNAL_SERVER_ERROR, err);
  }
};
