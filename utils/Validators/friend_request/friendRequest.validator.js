const Joi = require("joi");
const { ValidationMessage } = require("../../../constants/app.constant");

module.exports.storeValidator = (data) => {
  const schema = Joi.object({
    sender: Joi.required().messages({
      "any.required": ValidationMessage.REQUIRED,
    }),
    receiver: Joi.required().messages({
      "any.required": ValidationMessage.REQUIRED,
    }),
  });

  return schema.validate(data, {
    abortEarly: false,
    errors: { escapeHtml: true },
  });
};
