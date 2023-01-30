//Creating a model for Order

const mongoose = require("mongoose"); //loading mongoose module


//Creating the schema for order
const OrderSchema = new mongoose.Schema(
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
    amount:{type:Number,required:true},
    address:{type:Object,required:true},
    status:{type:String,default:"pending"},
  },
  { timestamps: true }
);

//exporting the module
module.exports = mongoose.model("Cart",OrderSchema);