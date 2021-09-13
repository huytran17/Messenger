const jwt = require("jsonwebtoken");
const _CONF = require("../config/app");

/**
 * Check if jwt token is provided and valid
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns The next request if passed else an error response
 */
module.exports.verifyAccess = async (req, res, next) => {
  //get the current jwt token in the session or cookie storage
  const token = req.session.token || req.signedCookies.token;
  if (token) {
    //verify token
    jwt.verify(token, _CONF.TOKEN_SECRET, function (err, decoded) {
      if (err) return res.redirect("/auth/login");
      //save for the next request
      req.decoded = decoded;
      next();
    });
  } else return res.redirect("/auth/login");
};
