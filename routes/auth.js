const router = require("express").Router();
const user = require("../models/user");

// routes
// registration
router.post("/register", async (req, res) => 
{
return res.status(200).json ({ msg: "register route ..."});
})

//login
router.post("/login", async (req, res) => 
{
    return res.status(200).json ({ msg: "login route ..."});

})

module.exports = router;