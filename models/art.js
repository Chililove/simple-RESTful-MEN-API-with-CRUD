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

artSchema.pre('findOneAndUpdate', function() {
    const update = this.getUpdate();
    if (update.__v != null) {
      delete update.__v;
    }
    const keys = ['$set', '$setOnInsert'];
    for (const key of keys) {
      if (update[key] != null && update[key].__v != null) {
        delete update[key].__v;
        if (Object.keys(update[key]).length === 0) {
          delete update[key];
        }
      }
    }
    update.$inc = update.$inc || {};
    update.$inc.__v = 1;
  });

// exports modules to be use outside of file
module.exports = mongoose.model("art", artSchema);