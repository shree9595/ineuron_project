import Joi from "joi";

export const UserValidation = Joi.object({
    email: Joi.string().email().min(6).max(255).required(),
    name: Joi.string().required(),
    password: Joi.string().required(),
});

export const UserEmailValidation = Joi.string().email().required();