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
    phone: Joi.string().messages({
      "string.base": ValidationMessage.STRING_BASE,
    }),
    address: Joi.string().max(255).messages({
      "string.base": ValidationMessage.STRING_BASE,
      "string.min": ValidationMessage.MIN,
      "string.max": ValidationMessage.MAX,
    }),
    gender: Joi.number().messages({
      "number.base": ValidationMessage.NUMBER_BASE,
      "number.infinity": ValidationMessage.NUMBER_INFINITY,
    }),
    relationship: Joi.number().messages({
      "number.base": ValidationMessage.NUMBER_BASE,
      "number.infinity": ValidationMessage.NUMBER_INFINITY,
    }),
    bio: Joi.string().max(255).messages({
      "string.base": ValidationMessage.STRING_BASE,
      "string.min": ValidationMessage.MIN,
      "string.max": ValidationMessage.MAX,
    }),
    quote: Joi.string().max(255).messages({
      "string.base": ValidationMessage.STRING_BASE,
      "string.min": ValidationMessage.MIN,
      "string.max": ValidationMessage.MAX,
    }),
    dob: Joi.date().messages({
      "date.base": ValidationMessage.DATE_BASE,
    }),
  });

  return schema.validate(data, {
    abortEarly: false,
    errors: { escapeHtml: true },
  });
};

module.exports.updatePasswordValidator = (data) => {
  const schema = Joi.object({
    password: Joi.string().min(8).max(32).required().messages({
      "string.base": ValidationMessage.STRING_BASE,
      "string.empty": ValidationMessage.REQUIRED,
      "any.required": ValidationMessage.REQUIRED,
      "string.min": ValidationMessage.MIN,
      "string.max": ValidationMessage.MAX,
    }),
    new_password: Joi.string().min(8).max(32).required().messages({
      "string.base": ValidationMessage.STRING_BASE,
      "string.empty": ValidationMessage.REQUIRED,
      "any.required": ValidationMessage.REQUIRED,
      "string.min": ValidationMessage.MIN,
      "string.max": ValidationMessage.MAX,
    }),
    re_password: Joi.any().required().valid(Joi.ref("new_password")).messages({
      "any.required": ValidationMessage.REQUIRED,
      "any.only": ValidationMessage.MISMATCH_REPWD,
    }),
  });

  return schema.validate(data, {
    abortEarly: false,
    errors: { escapeHtml: true },
  });
};
