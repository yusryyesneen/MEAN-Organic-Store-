//Creating a model for Product

const mongoose = require("mongoose"); //loading mongoose module


//Creating the schema for product
const ProductSchema = new mongoose.Schema(
    {
    title: { type: String, required: true, unique:true },
    desc:  { type: String, required: true },
    img:  { type: String, required: true},
    categories:  { type: Array},
    price:  { type: Number, required: true},
    
    
  },
  { timestamps: true }
);

//exporting the module
module.exports = mongoose.model("Product",ProductSchema);