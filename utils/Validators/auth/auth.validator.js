const Joi = require("joi");
const { ValidationMessage } = require("../../../constants/app.constant");

module.exports.registerValidator = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6).max(32).trim().required().messages({
      "string.base": ValidationMessage.STRING_BASE,
      "string.empty": ValidationMessage.REQUIRED,
      "any.required": ValidationMessage.REQUIRED,
      "string.min": ValidationMessage.MIN,
    }),
    email: Joi.string().email().trim().required().messages({
      "string.base": ValidationMessage.STRING_BASE,
      "string.empty": ValidationMessage.REQUIRED,
      "any.required": ValidationMessage.REQUIRED,
      "string.email": ValidationMessage.TYPE_EMAIL,
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

module.exports.loginValidator = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().trim().required().messages({
      "string.empty": ValidationMessage.REQUIRED,
      "any.required": ValidationMessage.REQUIRED,
      "string.email": ValidationMessage.TYPE_EMAIL,
    }),
    password: Joi.string().required().messages({
      "string.empty": ValidationMessage.REQUIRED,
      "any.required": ValidationMessage.REQUIRED,
    }),
    remember_me: Joi.boolean(),
  });

  return schema.validate(data, {
    abortEarly: false,
    errors: { escapeHtml: true },
  });
};

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

module.exports.resetPwdValidator = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().trim().required().messages({
      "string.empty": ValidationMessage.REQUIRED,
      "any.required": ValidationMessage.REQUIRED,
      "string.email": ValidationMessage.TYPE_EMAIL,
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
