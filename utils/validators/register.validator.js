const Joi = require("@hapi/joi");

module.exports = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6).max(32).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(32).required(),
  });

  return schema.validate(data);
};
