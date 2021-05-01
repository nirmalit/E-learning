const express=require("express");
const router=express.Router();

const { check } =require("express-validator");

const {signup,signin,signout, updateUser, isAuthenticated,isSignIn} =require("../controller/auth");
const { getUserById } = require("../controller/user");


router.param("userId",getUserById);
router.post("/signup",signup);
router.put("/update/:userId",isSignIn,isAuthenticated,updateUser);
router.post("/signin",[
    check("email")
    .isEmail().withMessage('email must required'),
    check("password")
    .isLength({ min:1 }).withMessage("Require password")
],signin);
router.get("/signout",signout);


module.exports=router;
