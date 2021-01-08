// Valdiation
const Joi = require('joi');

exports.validateRegistar = (data) => {
    // Validation Schema
    const schema = Joi.object({
        name: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .min(6)
            .required()
    });
    return schema.validateAsync(data);
};

exports.validateLogin = (data) => {
    // Validate Schema
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .min(6)
            .required()
    });
    return schema.validateAsync(data);
};