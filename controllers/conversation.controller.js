const Conversation = require("../models/conversation.model");
const {
  HttpResponse,
  HttpResponseError,
} = require("../utils/Response/http.response");
const { HttpStatus } = require("../constants/app.constant");

module.exports.getAll = async (req, res) => {
  try {
    const conversations = await Conversation.find({}).exec();

    return HttpResponse(res, HttpStatus.OK, conversations);
  } catch (err) {
    return HttpResponseError(res, HttpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

module.exports.getById = async (req, res) => {
  const { id } = { ...req.params };

  try {
    const conversations = await Conversation.findById(id).exec();

    return HttpResponse(res, HttpStatus.OK, conversations);
  } catch (err) {
    return HttpResponseError(res, HttpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

module.exports.store = (req, res) => {
    
};

module.exports.update = (req, res) => {};

module.exports.delete = (req, res) => {};
