const express=require('express');
const app=express();

require('dotenv').config();

const port=process.env.PORT ||8000;

//ODM - mongoose
const mongoose=require('mongoose');
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,useUnifiedTopology:true,useCreateIndex:true}).then(()=>{
        console.log("db connected successful")
    }).catch(()=>{
        console.log("Error in DB connection");
    });

//Middlewares
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require("cors");

const authRoutes=require("./routes/auth");
const deptRoutes=require("./routes/department");
const courseRoutes=require("./routes/course");
const userRoutes=require("./routes/user");



app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/api",authRoutes);
app.use("/api",deptRoutes);
app.use("/api",courseRoutes);
app.use("/api",userRoutes);




app.listen(port,()=>{
    console.log("Backend is running");
})