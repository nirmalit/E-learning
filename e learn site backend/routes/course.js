const express=require("express");
const router=express.Router();

const{getUserById}=require("../controller/user");
const{createCourse,updateCourse,removeCourse,getCourseDetailById,getAllCourse,getCourseById,getCourse}=require("../controller/course");
const { isSignIn, isAuthenticated, isAdmin } = require("../controller/auth");


router.param("userId",getUserById);
router.param("courseId",getCourseById);


router.post("/course/create/:userId",isSignIn,isAuthenticated,isAdmin,createCourse);
router.get("/course/:courseId",getCourse);
router.get("/course",getAllCourse);
router.get("/course/detail/:courseId",getCourseDetailById);
router.put("/course/:courseId/:userId",isSignIn,isAuthenticated,isAdmin,updateCourse);
router.delete("/course/:courseId/:userId",isSignIn,isAuthenticated,isAdmin,removeCourse);


module.exports=router;