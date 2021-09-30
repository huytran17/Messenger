const mailgun = require("mailgun-js");
const _CONF = require("../../config/app");

module.exports = (data, next) => {
  const mg = mailgun({
    apiKey: _CONF.MAIL_API_KEY,
    domain: _CONF.MAIL_DOMAIN,
  });
  
  mg.messages().send(data, (error, body) => {
    if (error) next(error);
  });
};
