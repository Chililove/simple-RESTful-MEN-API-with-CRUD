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
router.put("/:id", (req, res) => {

    const id = req.params.id;

    product.findByIdAndUpdate(id, req.body)
        .then(data => { 
            if(!data)
            {
res.status(404).send({message: "Cannot update product with id=" + id + ". product was not found"})
            }
            else 
            {
                    res.send({message: "product was succesfully updated"})
            }
        })
        .catch(error => { res.status(500).send({message: "Error updating product with id=" + id });})
    });


// DELETE - DELETE

module.exports = router;