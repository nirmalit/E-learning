const express=require("express");
const router=express.Router();

const {createDepartment,removeDepartment,updateDepartment,getAllDepartment,getDepartmentById, getDepartment}=require("../controller/department");
const {isSignIn,isAdmin,isAuthenticated}=require("../controller/auth");
const {getUserById}=require("../controller/user");


router.param("userId",getUserById);
router.param("departmentId",getDepartmentById);


router.post("/department/create/:userId",isSignIn,isAuthenticated,isAdmin,createDepartment);
router.get("/department/:departmentId",getDepartment);
router.get("/departments",getAllDepartment);
router.put("/department/:departmentId/:userId",isSignIn,isAuthenticated,isAdmin,updateDepartment);
router.delete("/department/:departmentId/:userId",isSignIn,isAuthenticated,isAdmin,removeDepartment);



module.exports=router;