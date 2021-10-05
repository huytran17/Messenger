const Joi = require("joi");
const { ValidationMessage } = require("../../../constants/app.constant");

module.exports.updateInfoValidator = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6).max(32).trim().required().messages({
      "string.base": ValidationMessage.STRING_BASE,
      "string.empty": ValidationMessage.REQUIRED,
      "any.required": ValidationMessage.REQUIRED,
      "string.min": ValidationMessage.MIN,
      "string.max": ValidationMessage.MAX,
    }),
    phone: Joi.string().min(10).max(12).message({
      "string.base": ValidationMessage.STRING_BASE,
      "string.min": ValidationMessage.MIN,
      "string.max": ValidationMessage.MAX,
    }),
    address: Joi.string().min(2).max(255).message({
      "string.base": ValidationMessage.STRING_BASE,
      "string.min": ValidationMessage.MIN,
      "string.max": ValidationMessage.MAX,
    }),
    gender: Joi.number().message({
      "number.base": ValidationMessage.NUMBER_BASE,
      "number.infinity": ValidationMessage.NUMBER_INFINITY,
    }),
    relationship: Joi.string().message({
      "string.base": ValidationMessage.STRING_BASE,
    }),
    dob: Joi.date().message({
      "date.base": ValidationMessage.DATE_BASE,
    }),
    password: Joi.string().min(8).max(32).required().messages({
      "string.base": ValidationMessage.STRING_BASE,
      "string.empty": ValidationMessage.REQUIRED,
      "any.required": ValidationMessage.REQUIRED,
      "string.min": ValidationMessage.MIN,
      "string.max": ValidationMessage.MAX,
    }),
    re_password: Joi.any().required().valid(Joi.ref("password")).messages({
      "any.required": ValidationMessage.REQUIRED,
      "any.only": ValidationMessage.MISMATCH_REPWD,
    }),
  });

  return schema.validate(data, {
    abortEarly: false,
    errors: { escapeHtml: true },
  });
};
