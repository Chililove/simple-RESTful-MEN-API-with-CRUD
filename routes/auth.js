const router = require("express").Router();
const User = require("../models/user");
const { validateRegistration, validateLogin } = require("../validation");
const bcrypt = require('bcrypt'); 

// routes
// registration
router.post("/register", async (req, res) => 
{

const {error} =validateRegistration(req.body);


if(error){
return res.status(400).json({ error: error.details[0].message });
}

const existingEmail = await User.findOne({ email: req.body.email });

if(existingEmail)
{
    return res.status(400).json({error: "Email already exist"});
}
// (10) number of rounds to generate salt
const salt = await bcrypt.genSalt(10);
// hash based on the password body and the salt
const password = await bcrypt.hash(req.body.password, salt);

const userObj = new User({
    name: req.body.name,
    email: req.body.email,
    password
});

try {
    const saveUser = await userObj.save();
    res.json({ error: null, data: saveUser._id });
} catch (error) {
    res.status(400).json({ error });
}

});

//login
router.post("/login", async (req, res) => 
{


const {error} = validateLogin(req.body);

if(error)
    {
    return res.status(400).json({ error: error.details[0].message });
    }
 

    const user = await User.findOne({email: req.body.email});

    if(!user)
{
    return res.status(400).json({error: "Email is wrong"});
}

const passwordValid = await bcrypt.compare(req.body.password, user.password);

if(!passwordValid)
{
    return res.status(400).json({error: "Password is wrong"});
}

    //return res.status(200).json ({ msg: "login route ..."});

})

module.exports = router;