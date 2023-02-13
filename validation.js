const joi = require('joi');


// validate input
const validateRegistration = (data) => {
    const schema = joi.object( {
        name: joi.string().min(6).max(255).required(),
        email: joi.string().min(6).max(255).required(),
        password: joi.string().min(6).max(255).required()
     })
     return schema.validate(data);
}

const validateLogin = (data) => {
    const schema = joi.object( {
        email: joi.string().min(6).max(255).required(),
        password: joi.string().min(6).max(255).required()
     })
     return schema.validate(data);
}

module.exports = {validateRegistration, validateLogin};