const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let artSchema = new Schema
({
    name: {type: String},
    description: {type: String},
    color: {type: String},
    size: {type: Number},
    price: {type: Number},
    inStock: {type: Boolean}


});
// exports modules to be use outside of file
module.exports = mongoose.model("art", artSchema);