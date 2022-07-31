const Joi = require('joi');

//USERS SCHEMA
const userQuerySchema = Joi.object({
    id: Joi.string().required()
});

const userDefaultBodySchema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    birthDate: Joi.string().required()
});

const userParamsSchema = Joi.object({
    id: Joi.string().required()
})

//PRODUCTS SCHEMA
const tshirtQuerySchema = Joi.object({
    id: Joi.string().optional(),
    size: Joi.string().optional()
})

const tshirtBodySchema = Joi.object({
    id: Joi.number().required(),
    size: Joi.string().required(),
    description: Joi.string().required()
})

module.exports = {
    userQuerySchema,
    userDefaultBodySchema,
    userParamsSchema,
    tshirtQuerySchema,
    tshirtBodySchema
}