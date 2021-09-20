const Message = require("../models/message.model");
const {
  HttpResponse,
  HttpResponseError,
} = require("../utils/Response/http.response");
const { HttpStatus } = require("../constants/app.constant");

module.exports.getAll = async (req, res) => {
  try {
    const { onModel, uid, mid } = req.params;

    const messages = await Message.find({
      uid,
      mid,
      onModel,
    }).exec();

    if (messages.length) return HttpResponse(res, HttpStatus.OK, messages);

    return HttpResponse(res, HttpStatus.NO_CONTENT);
  } catch (err) {
    return HttpResponseError(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};

module.exports.store = async (req, res) => {
  try {
    const { onModel, uid, mid } = req.params;

    const { content } = req.body;

    const message = await new Message({
      uid,
      mid,
      onModel,
      content,
    }).save();

    return HttpResponse(res, HttpStatus.CREATED, message);
  } catch (err) {
    return HttpResponseError(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};

module.exports.storeUploadFile = async (req, res) => {};

module.exports.destroy = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await Message.delete({ _id: id }).exec();

    return HttpResponse(res, HttpStatus.OK, message);
  } catch (err) {
    return HttpResponseError(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};
