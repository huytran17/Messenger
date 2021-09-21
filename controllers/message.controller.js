const Message = require("../models/message.model");
const {
  HttpResponse,
  HttpResponseError,
} = require("../utils/Response/http.response");
const { HttpStatus } = require("../constants/app.constant");

module.exports.getByModelId = async (req, res) => {
  try {
    const { mid } = req.params;

    const messages = await Message.findWithDeleted({ mid })
      .populate({
        path: "mid",
        populate: {
          path: "mems",
        },
      })
      .exec();

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

module.exports.storeUploadFile = async (req, res) => {
  try {
    const { onModel, uid, mid } = req.params;

    const file = req.source.toString("base64");

    const file_path = new Buffer.from(file, "base64");

    const message = await new Message({
      uid,
      mid,
      onModel,
      file_path,
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
