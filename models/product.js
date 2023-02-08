const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let productSchema = new Schema
({
    name: {type: String},
    description: {type: String},
    color: {type: String},
    size: {type: Number},
    price: {type: Number},
    inStock: {type: Boolean}


});

module.exports = mongoose.model("product", productSchema);