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
    .then(data => { 
        res.send(mapArray(data))})
    .catch(error => { res.status(500).send({message: error.message });})
});

 // READ all inStock products
 router.get("/inStock/:status", (req, res) => {

    art.find({inStock: req.params.status})
        .then(data => { res.send(data)})
        .catch(error => { res.status(500).send({message: error.message });})
    });
//READ SPECIFIC - GET
router.get("/:id", (req, res) => {

    art.findById(req.params.id)
        .then(data => { res.send(data)})
        .catch(error => { res.status(500).send({message: error.message });})
    });

    //GET products/lt/100 greater than or less than (two params in this route :, )
    // make this with big arrow not
     router.get("/price/:operator/:price", (req, res) =>{

    const operator = req.params.operator;
    const price = req.params.price;
/* tenary
    filterexpress = operator == "gt" ? {$gte: price} : {$lte: price}
*/
        let filterExpress;

    if(operator == "lt"){
        filterExpress = { $lte: price }
    }
    else{
        filterExpress = { $gte: price }

    }
    art.find({price: filterExpress})
    .then(data => {
        res.status(200)
        .send(mapArray(data)) })
        .catch(err => {
            res.status(500).send({message: err.message})
        })
    });

// refactored code ^ 
    // route.get("/price/:operator/:price", (req, res) =>{

    //         let filterExpress = {$gte: price}
    
    //     if(req.params.operator == "lt"){
    //         filterExpress = { $lte: price }
    //     }

    //     art.find({price: filterExpress})
    //     .then(data => {
    //         res.status(200)
    //         .send(mapArray(data)) })
    //         .catch(err => {
    //             res.status(500).send({message: err.message})
    //         })
    //     });


    

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

    // w. søren live coding in class
   function mapArray(inputArray){
// this is a kind of loop too, like foreach - map creates a new array. (foreach modifies arrays)
    let outputArray = inputArray.map(element => ({
        id: element._id,
        name: element.name,
        description: element.description,
        color: element.color,
        size: element.size,
        price: element.price,
        inStock: element.inStock,  
        // Adding uri for specific art, HATEOAS
        uri:"/api/arts/" + element._id

    }));

    return outputArray;

    }


module.exports = router;