const mongoose=require("mongoose");
const departmentSchema=new mongoose.Schema({
    name:{
        type:String,
        maxlength:32,
        trim:true,
        required:true,
        unique:true
    },
},{timestamps:true});

module.exports=mongoose.model("Department",departmentSchema);