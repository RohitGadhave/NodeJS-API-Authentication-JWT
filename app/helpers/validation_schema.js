const Joi = require('joi');

const authSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().alphanum().min(6).required(),
    name: Joi.string().min(5).required(),
    mobile: Joi.number().min(10).required(),
    //email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
});

const signInSchema = Joi.object(
    {
        email:Joi.string().email().lowercase().required(),
        password:Joi.string().alphanum().min(6).required()
    }
);


module.exports = { authSchema, signInSchema};