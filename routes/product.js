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

 // READ all inStock products
 router.get("/inStock", (req, res) => {

    product.find({inStock: true})
        .then(data => { res.send(data)})
        .catch(error => { res.status(500).send({message: error.message });})
    });
//READ SPECIFIC - GET
router.get("/:id", (req, res) => {

    product.findById(req.params.id)
        .then(data => { res.send(data)})
        .catch(error => { res.status(500).send({message: error.message });})
    });

   
// UPDATE - PUT 

// DELETE - DELETE

module.exports = router;