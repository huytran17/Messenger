const Joi = require("joi");
const { ValidationMessage } = require("../../../constants/app.constant");

module.exports = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(255).required().messages({
      "string.base": ValidationMessage.STRING_BASE,
      "string.empty": ValidationMessage.REQUIRED,
      "any.required": ValidationMessage.REQUIRED,
      "string.min": ValidationMessage.MIN,
      "string.max": ValidationMessage.MAX,
    }),
    color: Joi.string().required().messages({
      "string.base": ValidationMessage.STRING_BASE,
      "string.empty": ValidationMessage.REQUIRED,
      "any.required": ValidationMessage.REQUIRED,
    }),
    
  });

  return schema.validate(data, {
    abortEarly: false,
    errors: { escapeHtml: true },
  });
};