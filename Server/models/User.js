//Creating a model for User

const mongoose = require("mongoose"); //loading mongoose module


//Creating the schema for User
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique:true },
    email:  { type: String, required: true, unique:true },
    password:  { type: String, required: true},
    //here when we create a new user he wont be Admin 
    isAdmin: {
        type: Boolean,                    
        default: false,
    },
  },
  { timestamps: true }
);

//exporting the module
module.exports = mongoose.model("User",UserSchema);