const User = require("../models/User");
const { route } = require("./auth");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();     //importing the router
/*
router.get("/usertest", (req,res)=>{              //lh:5000/api/user/usertest
    res.send("User test is successfull")
});

router.post("/userposttest", (req,res)=> {      //post method is used to take some request from your client
    const username = req.body.username;         //.body is used to store data when u pass any u.name or passwd or any input
    res.send("Your username is:" + username);                                 
}); */

//Update
router.put("/:id", verifyTokenAndAuthorization, async(req,res) =>{           //creating a miidlewear to verify json web token 
     if(req.body.password) {
            req.body.password= CryptoJS.AES.encrypt
            (req.body.password,
             process.env.PASS_SEC
             ).toString();
     }
     try{
           const updatedUser = await User.findByIdAndUpdate(
           req.params.id, 
           {
            $set: req.body
           },
           { new:true }
           );
           res.status(200).json(updatedUser);

     }catch(err){
        req.status(500).json(err);
     }
});                  

//DELETE
route.delete("/:id", verifyTokenAndAuthorization, async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
    }catch(err){
        res.status(500).json(err);
    }
});

//GET USER
route.get("/find/:id", verifyTokenAndAdmin, async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const { password, ...others} =user._doc;
        res.status(200).json(others);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router; //exporting our router