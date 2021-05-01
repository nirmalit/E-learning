const express=require("express");
const router=express.Router();

const{getUserById, getProfilePhoto}=require("../controller/user");
const { isSignIn, isAuthenticated, isAdmin } = require("../controller/auth");
const{getUserRole,courseByUser,getUserProfile}=require("../controller/user");
const {getCourseById, enrollCourse}=require("../controller/course");


router.param("userId",getUserById);
router.param("courseId",getCourseById);


router.get("/user/role/:userId",isSignIn,isAuthenticated,getUserRole);
router.get("/user/profile/:userId",isSignIn,isAuthenticated,getUserProfile);
router.get("/profile/photo/:userId",getProfilePhoto)
//router.get("/user/course/:userId",isSignIn,isAuthenticated,courseByUser);
router.put("/course/join/:courseId/:userId",isSignIn,isAuthenticated,enrollCourse)


module.exports=router;