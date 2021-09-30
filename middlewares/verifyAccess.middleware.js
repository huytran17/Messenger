const jwt = require("jsonwebtoken");
const _CONF = require("../config/app");
const { HttpResponseError } = require("../utils/Response/http.response");
const { HttpStatus, ResponseMessage } = require("../constants/app.constant");

/**
 * Check if jwt token is provided and valid
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns The next request if passed else an error response
 */
module.exports.verifyAccess = async (req, res, next) => {
  //get the current jwt token in the session or cookie storage
  const token = await (req.session.token || req.signedCookies.token);

  if (token) {
    //verify token
    jwt.verify(token, _CONF.TOKEN_SECRET, function (err, decoded) {
      if (err)
        return HttpResponseError(
          res,
          HttpStatus.UNAUTHORIZED,
          ResponseMessage.UNAUTHORIZED_ACCESS
        );
      //save for the next request
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
