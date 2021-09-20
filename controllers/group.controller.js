const Group = require("../models/group.model");
const {
  HttpResponse,
  HttpResponseError,
} = require("../utils/Response/http.response");
const { HttpStatus } = require("../constants/app.constant");

module.exports.getAll = async (req, res) => {
  try {
    const groups = await Group.find({}).exec();

    if (groups.length) return HttpResponse(res, HttpStatus.OK, groups);

    return HttpResponse(res, HttpStatus.NO_CONTENT);
  } catch (err) {
    return HttpResponseError(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};

module.exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const group = await Group.findById(id).exec();

    if (group) return HttpResponse(res, HttpStatus.OK, group);

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
    const data = { ...req.body };

    const group = await new Group(data).save();

    return HttpResponse(res, HttpStatus.CREATED, group);
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
    const data = { ...req.body };

    const { id } = req.params;

    const group = await Group.findByIdAndUpdate(id, data, { new: true }).exec();

    return HttpResponse(res, HttpStatus.CREATED, group);
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

    const file = req.source.toString("base64");

    const background_photo = new Buffer.from(file, "base64");

    let group = await Group.findByIdAndUpdate(
      id,
      { background_photo },
      { new: true }
    ).exec();

    return HttpResponse(res, HttpStatus.CREATED, group);
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

    const group = await Group.findOneAndDelete({ _id: id }).exec();

    return HttpResponse(res, HttpStatus.CREATED, group);
  } catch (err) {
    return HttpResponseError(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};

module.exports.leave = async (req, res) => {
  try {
    const { gid, uid } = req.params;

    const group = await Group.findOneAndUpdate(
      { _id: gid },
      {
        $pull: { mems: uid },
      },
      { new: true }
    ).exec();

    return HttpResponse(res, HttpStatus.OK, group);
  } catch (err) {
    return HttpResponseError(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};

module.exports.join = async (req, res) => {
  try {
    const { gid, uid } = req.params;

    const group = await Group.findOneAndUpdate(
      { _id: gid },
      {
        $addToSet: { mems: uid },
      },
      { new: true }
    ).exec();

    return HttpResponse(res, HttpStatus.OK, group);
  } catch (err) {
    return HttpResponseError(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};
