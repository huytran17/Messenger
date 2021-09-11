const HttpResponseError = (
  res,
  code,
  fullError = "",
  msg = "",
  location = "server"
) => {
  const errors = [];
  errors[location] = {
    code,
    fullError,
    msg,
  };
  return res.status(code).json(errors);
};

const HttpResponse = (res, code, data = null) => {
  return res.status(code).json(data);
};

module.exports.HttpResponse = HttpResponse;
module.exports.HttpResponseError = HttpResponseError;
