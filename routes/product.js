const router = require("express").Router();
const product = require("../models/product");

//CRUD

//CREATE - POST -- Working now
router.post("/", (req, res) => {
    data = req.body;

    product.insertMany(data)
    .then(data => { res.send(data)})
    .catch(error => { res.status(500).send({message: error.message });})
});
//READ ALL - GET
router.get("/", (req, res) => {

product.find()
    .then(data => { res.send(data)})
    .catch(error => { res.status(500).send({message: error.message });})
});
//READ SPECIFIC - GET

// UPDATE - PUT 

// DELETE - DELETE

module.exports = router;