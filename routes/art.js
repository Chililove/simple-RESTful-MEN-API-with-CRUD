const router = require("express").Router();
const art = require("../models/art");
const { verifyToken } = require("../validation");

//CRUD

//CREATE - POST -- Working now
router.post("/", verifyToken, (req, res) => {
    data = req.body;

    art.insertMany(data)
    .then(data => { res.send(data); })
    .catch(error => { res.status(500).send({message: error.message });})
});
//READ ALL - GET
router.get("/", (req, res) => {

art.find()
    .then(data => { res.send(data)})
    .catch(error => { res.status(500).send({message: error.message });})
});

 // READ all inStock products
 router.get("/inStock", (req, res) => {

    art.find({inStock: true})
        .then(data => { res.send(data)})
        .catch(error => { res.status(500).send({message: error.message });})
    });
//READ SPECIFIC - GET
router.get("/:id", (req, res) => {

    art.findById(req.params.id)
        .then(data => { res.send(data)})
        .catch(error => { res.status(500).send({message: error.message });})
    });

   
// UPDATE - PUT 
router.put("/:id", verifyToken, (req, res) => {

    const id = req.params.id;

    art.findByIdAndUpdate(id, req.body)
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
router.delete("/:id", verifyToken, (req, res) => {

    const id = req.params.id;

    art.findByIdAndDelete(id)
        .then(data => { 
            if(!data)
            {
res.status(404).send({message: "Cannot delete product with id=" + id + ". product was not found"})
            }
            else 
            {
                    res.send({message: "product was succesfully deleted"})
            }
        })
        .catch(error => { res.status(500).send({message: "Error deleting product with id=" + id });})
    });


module.exports = router;