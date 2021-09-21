const Info = require("../models/info.model");
const {
  HttpResponse,
  HttpResponseError,
} = require("../utils/Response/http.response");
const { HttpStatus } = require("../constants/app.constant");

module.exports.getInfo = async (req, res) => {
  try {
    const { uid, mid } = req.params;

    const infos = await Info.find({ uid, mid }).exec();

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

    const info = await new Info({ uid, mid, onModel }, data).save();

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

    const info = await Info.findOneAndUpdate(
      { uid, mid },
      { data },
      { new: true }
    ).exec();

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

    const info = await Info.findByIdAndDelete(id);

    return HttpResponse(res, HttpStatus.CREATED, info);
  } catch (err) {
    return HttpResponseError(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
};
