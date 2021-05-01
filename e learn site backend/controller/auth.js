const User=require("../models/user");
const { check, validationResult } = require('express-validator');
const formidable=require("formidable");
const fs=require("fs");
const _=require("lodash");

const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');


//creating account
exports.signup=(req,res)=>{
    let form=formidable.IncomingForm();
    form.keepExtension=true;
    
    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error:"problem in form photo"
            });
        }
        const {name,email,phone,bio,city,country,company,school,gender,password}=fields;
        if(!name || !email || !phone || !bio || !city || !country || !company || !school || !gender || !password){
            return res.status(400).json({
                error:"please include value in all the fields"
            });
        }
        const user=new User(fields);

        if(file.photo){
            if(file.photo.size>4000000){
                return res.status(400).json({
                    error:"Photo size must be 4 Mb"
                })
            }
            user.photo.data=fs.readFileSync(file.photo.path);
            user.photo.contentType=file.photo.type;
        }
        user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                error:"Check DB requirements"
            })
        }
        res.json({
            id:user._id,
            name:user.name
        });
    })
    })    
}

//update user
exports.updateUser=(req,res)=>{
    let form=formidable.IncomingForm();
    form.keepExtension=true;
    
    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error:"problem in form photo"
            });
        }
        let user=req.profile;
        user=_.extend(user,fields);

        if(file.photo){
            if(file.photo.size>4000000){
                return res.status(400).json({
                    error:"Photo size must be 4 Mb"
                })
            }
            user.photo.data=fs.readFileSync(file.photo.path);
            user.photo.contentType=file.photo.type;
        }
        user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                error:"Check DB requirements"
            })
        }
        res.json({
            id:user._id,
            name:user.name
        });
    })
    })    
}

exports.signin=(req,res)=>{
    const errors=validationResult(req);
    const { email,password }=req.body;

    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }
    User.findOne({email},(err,user)=>{
        if(err || !user){
            res.status(400).json({
                error:"User email does not exist"
            });
        }
        if(!user.authenticate(password)){
            return res.status(400).json({
                error:"email and password does not match"
            });
        }
        //token
        const token = jwt.sign({ _id:user._id }, process.env.SECRET);
        res.cookie("token",token,{ expire: new Date() + 2 });   

        const { _id,name,email,role }=user;
        return res.json({ token, user:{ _id,name,email,role }});
    })
}

exports.signout=(req,res)=>{
    res.clearCookie("token");
    res.json({
        message:"signout successfully"}
    );
}

//Routes protection
exports.isSignIn=expressJwt({
    secret: process.env.SECRET,
    userProperty:"auth"
});

//My middleware to check authentication
exports.isAuthenticated=(req,res,next)=>{
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker){
        return res.status(403).json({
            error:"ACCESS DENIED"
        })
    }
    next();
}
exports.isAdmin=(req,res,next)=>{
    if(req.profile.role===0){
       return res.status(403).json({
            error:"ACCESS DENIED, your are not admin"
        })
    }
    next();
}