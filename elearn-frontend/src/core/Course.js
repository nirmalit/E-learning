import React, { useEffect, useState } from 'react'
import { allCourses } from './../course/helper/courseHelper';
import Base from '../core/base';
import {Link,Redirect} from "react-router-dom";
import { isauthenticated } from '../auth/helper/credential';
import { enrollCourse } from './helper/courseHelper';

const Course=()=>{
    const {user ,token}=isauthenticated();
    const [values,setValues]=useState({
        courses:[],
        getRedirect:false,
        error:"",
        success:"",
        loading:""
    });
    const preLoader=()=>{
        allCourses().then(data=>{
            if(data.error){
                setValues({...values,error:data.error})
            }else{
                setValues({
                    ...values,
                    courses:data
                })
            }
        }).catch(err=>console.log(err))
    }
    useEffect(() => {
        preLoader()
    }, [])
    const {courses}=values;
    const enroll=(courseId)=>{
        enrollCourse(courseId).then(data=>{
            if(data.error){
                setValues({
                    ...values,
                    error:data.error
                })
            }else{
                setValues({
                    ...values,
                    success:"Course is added to your enroll list"
                })
            }
        })
    }
    const {success,error}=values;
    const successMessage=()=>{
      
        return (
        <div className="alert alert-success mt-3" role="alert"
        style={{display : success? "" : "none"}}
        >
        <h4>Course is successfully Added to your enrollment..!</h4>
        </div>
        );
      }
  
      const errorMessage=()=>(
        <div className="alert alert-danger mt-3" role="alert"
        style={{display:error ? "":"none"}}
        >
        <h4>failed to Add Course</h4>
        <h5>Reason :</h5><p>{error}</p>
        </div>
      )
    return (
        <div>
            <Base title="Our Courses" description="Register to Our Courses" />
            {successMessage()}
            {errorMessage()}
            {
                    courses.map((c,index)=>(
                        <div key={index} className="row container">
                            <div className="col-6 card shadow ">
                                <h3 className="text-dark m-auto">{c.name}</h3>
                                <div className="card text-center shadow m-3 pd-3">
                                {c.description}
                                </div>
                                <div className="m-auto">
                                    {(isauthenticated())&&(user.role==0)&&(<button onClick={()=>enroll(c._id)} className="btn btn-dark btn-block mb-1">Enroll Now</button>)}
                                </div>
                            </div>
                        </div>
                    ))
                }
        </div>
    )
}
export default Course;
