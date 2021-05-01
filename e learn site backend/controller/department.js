const Department=require("../models/department");

exports.createDepartment=(req,res)=>{
    const department=new Department(req.body);
    department.save((err,dept)=>{
        if(err){
            return res.status(400).json({
                error:"Not able to create department"
            })
        }
        res.json({ dept });
    });
};

exports.updateDepartment=(req,res)=>{
    const department=req.department;
    department.name=req.body.name;
    department.save((err,updatedDept)=>{
        if(err){
            return res.status(400).json({
                error:"Not able to update department"
            });
        }
        return res.json(updatedDept);
    });
};

exports.removeDepartment=(req,res)=>{
    const department=req.department
    department.remove((err,dept)=>{
        if(err){
            return res.status(400).json({
                error:"Not able to delete department"
            });
        }
        res.json({
            message:"Successfully department is deleted"
        });
    });
}


exports.getAllDepartment=(req,res)=>{
    Department.find().exec((err,dept)=>{
        if(err){
            return res.status(400).json({
                error:"Department is not found"
            });
        }
        res.json(dept);
    });
};

exports.getDepartment=(req,res)=>{
    return res.json(req.department);
};

exports.getDepartmentById=(req,res,next,id)=>{
    Department.findById(id).exec((err,dept)=>{
        if(err){
            return res.status(400).json({
                error:"Department not found"
            });
        }
        req.department=dept;
        next();
    });

};