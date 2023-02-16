const router = require("express").Router();
const User = require("../models/user");
const { validateRegistration, validateLogin } = require("../validation");
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
// routes
// registration
router.post("/register", async (req, res) => 
{

const {error} =validateRegistration(req.body);
//throw error
if(error){
return res.status(400).json({ error: error.details[0].message });
}

const existingEmail = await User.findOne({ email: req.body.email });
// self explanatory
if(existingEmail)
{
    return res.status(400).json({error: "Email already exist"});
}
// (10) number of rounds to generate salt
const salt = await bcrypt.genSalt(10);
// hash based on the password body and the salt
const password = await bcrypt.hash(req.body.password, salt);
// make new userobject
const userObj = new User({
    name: req.body.name,
    email: req.body.email,
    password
});
// saving the user or throw error
try {
    const saveUser = await userObj.save();
    res.json({ error: null, data: saveUser._id });
} catch (error) {
    res.status(400).json({ error });
}

});

//login route
router.post("/login", async (req, res) => 
{

const {error} = validateLogin(req.body);

if(error)
    {
    return res.status(400).json({ error: error.details[0].message });
    }
// if one is not found, throw error
    const user = await User.findOne({email: req.body.email});

    if(!user)
{
    return res.status(400).json({error: "Email is wrong"});
}
// encrypting with bcrypt
const passwordValid = await bcrypt.compare(req.body.password, user.password);

if(!passwordValid)
{
    return res.status(400).json({error: "Password is wrong"});
}
// signing of the token with data, expiration and token secret.
const token = jwt.sign
(
    {
    name: user.name,
    id: user._id
    },
    // token secret
    process.env.TOKEN_SECRET,
    // expiration time
    { expiresIn: process.env.JWT_EXPIRES_IN },

);
// attach to header to use in ex postman to authorize access
res.header("auth-token, token").json({
    error: null,
    data: { token }
})

});

module.exports = router;