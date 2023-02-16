const joi = require('joi');
const jwt = require('jsonwebtoken');

// joi for security
// validate input for registration
const validateRegistration = (data) => {
    const schema = joi.object( {
        name: joi.string().min(6).max(255).required(),
        email: joi.string().min(6).max(255).required(),
        password: joi.string().min(6).max(255).required()
     })
     return schema.validate(data);
}
//validation of login, requirements, sizes, datatypes
const validateLogin = (data) => {
    const schema = joi.object( {
        email: joi.string().min(6).max(255).required(),
        password: joi.string().min(6).max(255).required()
     })
     return schema.validate(data);
}

// logic to verify token, JWT, this is a middleware function
const verifyToken = (req, res, next) => {
    const token = req.header("auth-token");
// if no token, we throw an error access denied
    if(!token) return res.status(401).json({error: "Access denied"});

// verifying the token here
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();

    } catch (error) {
        res.status(400).json({error: "Token is not valid"});
    }
}
// exporting modules to be uses elsewhere
module.exports = {validateRegistration, validateLogin, verifyToken};