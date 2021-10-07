const Message = require("../models/message.model");
const {
  HttpResponse,
  HttpResponseError,
} = require("../utils/Response/http.response");
const { HttpStatus } = require("../constants/app.constant");

module.exports.getByModelId = async (req, res) => {
  try {
    const { mid } = req.params;

    const messages = await Message.getByModelId(mid);

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

    const message = await Message.store(onModel, uid, mid, content);

    return HttpResponse(res, HttpStatus.CREATED, message);
  } catch (err) {
    return HttpResponseError(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};

module.exports.storeFile = async (req, res) => {
  try {
    const { onModel, uid, mid } = req.params;

    const file_path = req.source.toString("base64");

    const message = await Message.storeFile(onModel, uid, mid, file_path);

    return HttpResponse(res, HttpStatus.CREATED, message);
  } catch (err) {
    return HttpResponseError(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};

module.exports.destroy = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await Message.destroy(id);

    return HttpResponse(res, HttpStatus.OK, message);
  } catch (err) {
    return HttpResponseError(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};
