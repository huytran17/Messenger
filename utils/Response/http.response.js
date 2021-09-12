const HttpResponseError = (res, code, error = "", message = "") => {
  return res.status(code).json({
    code,
    error,
    message,
  });
};

const HttpResponse = (res, code, data = null) => {
  return res.status(code).json(data);
};

module.exports.HttpResponse = HttpResponse;
module.exports.HttpResponseError = HttpResponseError;
