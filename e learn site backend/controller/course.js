const Course=require("../models/course");
const { addCourses } = require("./user");
const User=require("../models/user");

exports.createCourse=(req,res)=>{
    const course=new Course(req.body);
    course.save((err,updatedCourse)=>{
        if(err){
            return res.status(400).json({
                error:"DB requirement is not stasified"
            });
        }
        User.updateOne({"_id":req.profile._id},{
            "$push":{ "courses" : updatedCourse._id}
        },function(err,result){
            if(err){
                return res.status(400).json({
                    error:"User Db courses not pushed"
                })
            }else{
                return res.json({
                    message:"Successfully Courses Added"
                })
            }
        })
    });
}

exports.updateCourse=(req,res)=>{
    const course=req.body;
    Course.updateOne({"_id":req.course.id},course,function(err,result){
        if(err){
            return res.status(400).json({
                error:"Not able to update"
            })
        }else{
            return res.json({
                "message":"Successfully Courses updated"
            })
        }
    })
};

exports.removeCourse=(req,res)=>{
    const course=req.course
    course.remove((err,deletedCourse)=>{
        if(err){
            return res.status(400).json({
                error:"Not able to delete Course"
            });
        }
        User.updateOne({"_id":req.profile._id},{
            "$pull":{ "courses" : course._id}
        },function(err,result){
            if(err){
                return res.status(400).json({
                    error:"User Db courses not pushed"
                })
            }else{
                return res.json({
                    "message":"Successfully deleted Courses"
                })
            }
        })
    });
}

exports.getAllCourse=(req,res)=>{
    Course.find().exec((err,allCourse)=>{
        if(err){
            return res.status(400).json({
                error:"Course is not found"
            });
        }
        res.json(allCourse);
    });
};

exports.getCourseDetailById=(req,res,id)=>{
    Course.findById(id)
    .populate("course")
    .exec((err,course)=>{
        if(err){
            return res.status(400).json({
                error:"Course not found"
            });
        }
        res.json(course)
    });
};

exports.enrollCourse=(req,res)=>{
    User.updateOne({"_id":req.profile._id},{
        "$push":{ "courses" : req.course._id}
    },function(err,result){
        if(err){
            return res.status(400).json({
                error:"User Db courses not pushed"
            })
        }else{

            let total=req.course.capacity-1;
            Course.updateOne({"_id":req.course.id},{capacity:total},function(err,result){
                if(err){
                    return res.status(400).json({
                        error:"problem in DB updation"
                    })
                }else{
                    return res.json({
                        "message":"Successfully Courses is added"
                    })
                }
            })
            

        }
    })
}
exports.getCourse=(req,res)=>{
    return res.json(req.course);
};

exports.getCourseById=(req,res,next,id)=>{
    Course.findById(id)
    .populate("course")
    .exec((err,course)=>{
        if(err){
            return res.status(400).json({
                error:"Course not found"
            });
        }
        req.course=course;
        next();
    });
};