const mongoose=require("mongoose");
const crypto = require('crypto');
const uuidv1=require("uuid/v1")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    role:{
        type:Number,
        default:0
    },
    encrypted_password:{
        type:String,
        required:true
    },
    bio:{
        type:String
    },
    city:{
        type:String
    } ,
    country:{
        type:String
    },
    company:{
        type:String
    },
    school:{
    type:String
    },
    languages:{
        type:String
    }, 
    gender:{
        type:String
    },
    salt:String,
    courses:{
        type:Array,
        default:[]
    },
    photo:{
        data:Buffer,
        contentType:String
    }

},{timestamps:true});

userSchema.virtual("password")
          .set(function(password){
              this._password=password;
              this.salt=uuidv1();
              this.encrypted_password=this.securePassword(password);
          })
          .get(function(){
              return this._password;
          });

userSchema.methods={
    authenticate: function(plainpassword){
        return this.securePassword(plainpassword)===this.encrypted_password;
    },
    securePassword: function(plainpassword){
        if(!plainpassword) return "";
        try{
           return crypto.createHmac('sha256', this.salt)
                   .update(plainpassword)
                   .digest('hex');
        }catch(error){
            return error;
        }
    },
    addCourse:function(courseId){
        try{
            this.courses.push(courseId);
            return "Success"
        }catch{
            return "not able to push"
        }
    }
}
module.exports=mongoose.model("User",userSchema);
