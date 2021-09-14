const HttpResponseError = (res, status, error = "", message = "") => {
  return res.status(status).json({
    status,
    error,
    message,
  });
};

const HttpResponse = (res, status, data = null) => {
  return res.status(status).json(data);
};

module.exports.HttpResponse = HttpResponse;
module.exports.HttpResponseError = HttpResponseError;
