const User=require("../models/user");
const Course=require("../models/course")
exports.getUserById=(req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error:"no user found"
            })
        }
        req.profile=user;
        next();
    })
}

exports.getUserProfile=(req,res)=>{
    let profile=req.profile
    profile.encrypted_password=undefined;
    profile.salt=undefined;
    return res.json(profile)
}
exports.getProfilePhoto=(req,res)=>{
    let profile=req.profile
    if(profile.photo){
        res.set("Content-Type",profile.photo.contentType)
        return res.send(profile.photo.data)
    }
}
exports.getUserRole=(req,res)=>{
    if(req.profile.role===0){
        return res.json({
            "role":"Student"
        })
     }else{
         return res.json({
             "role":"Teacher"
         })
     }
}

exports.addCourses=(courseId)=>{
    const user=req.profile;
    const addedCourses=new Array(user.courses);
    addedCourses.push(courseId); 
    
    // user.save((err,user)=>{
    //     if(err){
    //         return "error";
    //     }else{
    //         return "Success";
    //     }
    // })

}