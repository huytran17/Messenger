const jwt = require("jsonwebtoken");
const _CONF = require("../config/app");
const {
  HttpResponse,
  HttpResponseError,
} = require("../utils/Response/http.response");
const { HttpStatus, ResponseMessage } = require("../constants/app.constant");

module.exports.verifyAccess = async (req, res, next) => {
  console.log("verifyAccess");
  const token = req.session.token;
  if (token) {
    jwt.verify(token, _CONF.TOKEN_SECRET, function (err, decoded) {
      if (err) res.redirect("/auth/register"); //ve trang dang nhap: sua register -> login
      req.decoded = decoded;
      next();
    });
  } else
    return HttpResponseError(
      res,
      HttpStatus.UNAUTHORIZED,
      ResponseMessage.UNAUTHORIZED_ACCESS
    );
};
