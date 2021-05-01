const mongoose=require("mongoose");
const { ObjectId }=mongoose.Schema;

const courseSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    department:{
        type:ObjectId,
        ref:"Department",
        required:true
    },
    description:{
        type:String,
        required:true
    },
    capacity:{
        type:Number,
        required:true
    },
},{ timestamps:true })
module.exports=mongoose.model("Course",courseSchema);
