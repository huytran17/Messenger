const Conversation = require("../models/conversation.model");
const {
  HttpResponse,
  HttpResponseError,
} = require("../utils/Response/http.response");
const { HttpStatus } = require("../constants/app.constant");

module.exports.getAll = async (req, res) => {
  try {
    const conversations = await Conversation.getAll();

    if (conversations.length)
      return HttpResponse(res, HttpStatus.OK, conversations);

    return HttpResponse(res, HttpStatus.NO_CONTENT);
  } catch (err) {
    return HttpResponseError(res, HttpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

module.exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const conversation = await Conversation.getById(id);

    if (conversation) return HttpResponse(res, HttpStatus.OK, conversation);

    return HttpResponse(res, HttpStatus.NO_CONTENT);
  } catch (err) {
    return HttpResponseError(res, HttpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

module.exports.store = async (req, res) => {
  try {
    const data = { ...req.body };

    const conversation = await new Conversation(data).save();

    return HttpResponse(res, HttpStatus.CREATED, conversation);
  } catch (err) {
    return HttpResponseError(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};

module.exports.updateBackground = async (req, res) => {
  try {
    const { id } = req.params;

    const background_photo = await req.source.toString("base64");

    const conversation = await Conversation.updateBackground(
      id,
      background_photo
    );

    return HttpResponse(res, HttpStatus.CREATED, conversation);
  } catch (err) {
    return HttpResponseError(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};

module.exports.updateInfo = async (req, res) => {
  try {
    const { id } = req.params;

    const data = { ...req.body };

    const conversation = await Conversation.updateInfo(id, data);

    return HttpResponse(res, HttpStatus.CREATED, conversation);
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

    const conversation = await Conversation.destroy(id);

    return HttpResponse(res, HttpStatus.OK, conversation);
  } catch (err) {
    return HttpResponseError(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};
