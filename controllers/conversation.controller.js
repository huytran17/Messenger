const Conversation = require("../models/conversation.model");
const {
  HttpResponse,
  HttpResponseError,
} = require("../utils/Response/http.response");
const { HttpStatus } = require("../constants/app.constant");

module.exports.getAll = async (req, res) => {
  try {
    const conversations = await Conversation.find({}).exec();

    if (conversations.length) return HttpResponse(res, HttpStatus.OK, conversations);
    else return HttpResponse(res, HttpStatus.NO_CONTENT);
  } catch (err) {
    return HttpResponseError(res, HttpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

module.exports.getById = async (req, res) => {
  const { id } = { ...req.params };

  try {
    const conversation = await Conversation.findById(id).exec();

    if (conversation) return HttpResponse(res, HttpStatus.OK, conversation);
    else return HttpResponse(res, HttpStatus.NO_CONTENT);
  } catch (err) {
    return HttpResponseError(res, HttpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

module.exports.store = async (req, res) => {
  const data = { ...req.body };

  try {
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

module.exports.update = (req, res) => {
  
};

module.exports.delete = (req, res) => {};
