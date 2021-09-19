const Group = require("../models/group.model");
const {
  HttpResponse,
  HttpResponseError,
} = require("../utils/Response/http.response");
const { HttpStatus } = require("../constants/app.constant");

module.exports.getAll = async (req, res) => {};

module.exports.getById = async (req, res) => {};

module.exports.store = async (req, res) => {};

module.exports.updateInfo = async (req, res) => {};

module.exports.updateBackground = async (req, res) => {};

module.exports.destroy = async (req, res) => {};

module.exports.kick = async (req, res) => {
  try {
    const { gid, uid } = req.params;

    const group = Group.findById(gid).exec();

    group.mems = await group.mems.filter(
      (mem) => mem.id.toString("hex") !== uid
    );

    group.save();

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
    const { gid, uid } = req.params;

    const group = await Group.findById(gid).exec();

    group.mems.push(uid);

    group.save();

    return HttpResponse(res, HttpStatus.OK, conversation);
  } catch (err) {
    return HttpResponseError(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};
