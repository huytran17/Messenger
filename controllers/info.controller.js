const Info = require("../models/info.model");
const {
  HttpResponse,
  HttpResponseError,
} = require("../utils/Response/http.response");
const { HttpStatus } = require("../constants/app.constant");

module.exports.getInfo = async (req, res) => {
  try {
    const { uid, mid } = req.params;

    let infos = await Info.getInfo(uid, mid);

    if (infos.length) return HttpResponse(res, HttpStatus.OK, infos);

    return HttpResponse(res, HttpStatus.NO_CONTENT);
  } catch (err) {
    return HttpResponseError(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};

module.exports.store = async (req, res, next) => {
  try {
    const { uid, mid, onModel } = req.params;

    const data = { ...req.body };

    let info = await Info.store(uid, mid, onModel, data);

    return HttpResponse(res, HttpStatus.CREATED, info);
  } catch (err) {
    return HttpResponseError(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};

module.exports.update = async (req, res, next) => {
  try {
    const { uid, mid } = req.params;

    const data = { ...req.body };

    let info = await Info.updateInfo(uid, mid, data);

    return HttpResponse(res, HttpStatus.CREATED, info);
  } catch (err) {
    return HttpResponseError(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};

module.exports.destroy = async (req, res, next) => {
  try {
    const { id } = req.params;

    let info = await Info.destroy(id);

    return HttpResponse(res, HttpStatus.CREATED, info);
  } catch (err) {
    return HttpResponseError(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};
