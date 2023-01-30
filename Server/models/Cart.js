//Creating a model for Cart

const mongoose = require("mongoose"); //loading mongoose module


//Creating the schema for cart
const CartSchema = new mongoose.Schema(
    {
    userId: { type: String, required: true},
    products:  [
        {
               productId:{
                type: String,
             },
               quantity: {
                type:Number,
                default:1,
         },
        },
    ],
  },
  { timestamps: true }
);

//exporting the module
module.exports = mongoose.model("Cart",CartSchema);