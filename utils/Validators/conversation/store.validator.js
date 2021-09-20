const Joi = require("joi");
const { ValidationMessage } = require("../../../constants/app.constant");

module.exports = (data) => {
  const schema = Joi.object({
    mems: Joi.required().messages({
      "any.required": ValidationMessage.REQUIRED,
    }),
  });

  return schema.validate(data, {
    abortEarly: false,
    errors: { escapeHtml: true },
  });
};
