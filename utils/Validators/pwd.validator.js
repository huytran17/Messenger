const Joi = require("joi");
const { ValidationMessage } = require("../../constants/app.constant");

module.exports.changePwdValidator = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().trim().required().messages({
      "string.empty": ValidationMessage.REQUIRED,
      "any.required": ValidationMessage.REQUIRED,
      "string.email": ValidationMessage.TYPE_EMAIL,
    }),
  });

  return schema.validate(data, {
    abortEarly: false,
    errors: { escapeHtml: true },
  });
};
