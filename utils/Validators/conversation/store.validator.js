const Joi = require("joi");
const Conversation = require("../../../models/conversation.model");
const { ValidationMessage } = require("../../../constants/app.constant");

module.exports.storeValidator = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(1)
    })
}