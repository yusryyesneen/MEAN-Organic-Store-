//MongoDB Authentication with Nodejs | All the endpoints must be organized in routes folder -->root files

const router = require("express").Router();  //importing express router
const User = require("../models/User");   //importing User model
const CryptoJS = require("crypto-js");   
const jwt = require("jsonwebtoken");

//REGISTER
//using post method becz client sending us u.name,passwd & other infos ,(/register) is the end point
router.post("/register",async (req, res) => {
    const newUser = new User({        //<---- 'User' model object  
        username:req.body.username,
        email:req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
        //password:req.body.password,           //we should encrypt the password after saving in DB using cryptojs
    });  
    //sending user inputs into DB
    try{
        
    const savedUser = await newUser.save();
    res.status(201).json(savedUser); //200:Successful / 201:Successfully added --> Sending response msg via status
    }catch(err){
        res.status(500).json(err);  //500:Error status
    }
});

//LOGIN
router.post("/login",async (req,res) =>{
    try{
        const user = await User.findOne({ username:req.body.username });
        !user && res.status(401).json("Wrong credentials!");

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        OriginalPassword !==req.body.password && 
        res.status(401).json("Wrong credentials!");

        const accessToken =jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
        {expiresIn:"3d"}              //after 3days user need to login again..JWT is used to make the application more secure
        );

        const { password, ...others } = user._doc;

        return res.status(200).json({...others, accessToken});

    }catch (err){
        res.status(500).json(err);
    }
}); 

module.exports = router;  