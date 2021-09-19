const Conversation = require("../models/conversation.model");
const {
  HttpResponse,
  HttpResponseError,
} = require("../utils/Response/http.response");
const { HttpStatus } = require("../constants/app.constant");

module.exports.getAll = async (req, res) => {
  try {
    const conversations = await Conversation.find({}).exec();

    if (conversations.length)
      return HttpResponse(res, HttpStatus.OK, conversations);
    else return HttpResponse(res, HttpStatus.NO_CONTENT);
  } catch (err) {
    return HttpResponseError(res, HttpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

module.exports.getById = async (req, res) => {
  try {
    const { id } = { ...req.params };

    const conversation = await Conversation.findById(id).exec();

    if (conversation) return HttpResponse(res, HttpStatus.OK, conversation);
    else return HttpResponse(res, HttpStatus.NO_CONTENT);
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

    const file = await req.source.toString("base64");

    const background_photo = new Buffer.from(file, "base64");

    let conversation = await Conversation.findByIdAndUpdate(
      id,
      { background_photo },
      {
        new: true,
      }
    ).exec();

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
    const { id } = { ...req.params };

    const data = { ...req.body };

    const conversation = await Conversation.findByIdAndUpdate(id, data, {
      new: true,
    });

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

    let conversation = await Conversation.findByIdAndDelete(id).exec();

    return HttpResponse(res, HttpStatus.OK, conversation);
  } catch (err) {
    return HttpResponseError(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};

module.exports.kick = async (req, res) => {
  try {
    const { cid, uid } = req.params;

    const conversation = await Conversation.findById(cid).exec();

    conversation.mems = await conversation.mems.filter((mem) => {
      return mem.id.toString("hex") !== uid;
    });

    conversation.save();

    return HttpResponse(res, HttpStatus.OK, conversation);
  } catch (err) {
    return HttpResponseError(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};

module.exports.add = async (req, res) => {
  try {
    const { cid, uid } = req.params;

    const conversation = await Conversation.findById(cid).exec();

    conversation.mems.push(uid);

    conversation.save();

    return HttpResponse(res, HttpStatus.OK, conversation);
  } catch (err) {
    return HttpResponseError(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};
