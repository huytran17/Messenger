const HttpResponseError = (res, status, errors = "", path = "") => {
  return res.status(status).json({
    error: true,
    status,
    errors,
    path,
  });
};

const HttpResponse = (res, status, data = null) => {
  return res.status(status).json({ error: false, data });
};

module.exports.HttpResponse = HttpResponse;
module.exports.HttpResponseError = HttpResponseError;
