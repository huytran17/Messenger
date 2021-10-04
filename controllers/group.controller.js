const Group = require("../models/group.model");
const {
  HttpResponse,
  HttpResponseError,
} = require("../utils/Response/http.response");
const { HttpStatus } = require("../constants/app.constant");

module.exports.getAll = async (req, res) => {
  try {
    const groups = await Group.getAll();

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

    const group = await Group.getById(id);

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

    const group = await Group.store(data);

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

    const group = await Group.updateInfo(id, data);

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

    const background_photo = req.source.toString("base64");

    let group = await Group.updateBackground(id, background_photo);

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

    const group = await Group.destroy(id);

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

    const group = await Group.leave(gid, uid);

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

    const group = await Group.join(gid, uid);

    return HttpResponse(res, HttpStatus.OK, group);
  } catch (err) {
    return HttpResponseError(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};
