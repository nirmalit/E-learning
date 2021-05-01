import React, { useEffect, useState } from 'react'
import { isauthenticated } from '../auth/helper/credential';
import Base from '../core/base'
import { allDepartments } from '../faculty/helper/helperapi';
import { allCourses, createCourse, deleteCourse } from './helper/courseHelper';
import { Link } from 'react-router-dom';

export const Managecourse = () => {
    const {user ,token}=isauthenticated();
    const [values,setValues]=useState({
        allCourse:[],
        alldepartments:[],
        getRedirect:false,
        error:"",
        loading:""
    });
    const preLoader=()=>{
        
        allCourses().then(data=>{
            if(data.error){
                setValues({...values,error:data.error})
            }else{
                setValues({
                    ...values,
                    allCourse:data
                })
            }
        }).catch(err=>console.log(err))
    }
    useEffect(() => {
        preLoader()
    }, [])

    const performDelete=courseID=>{
        
        deleteCourse(courseID).then((data)=>{
            if(data.error){
                console.log("Can not able to delete");
                console.log(data.error);
            }else{
                preLoader();
            }
        })
    }
    const {allCourse,alldepartments}=values;

    return (
        <div>
            <Base title="Course" description="Create Course"/>
            <div className="container shadow ">
            <div className="card text-center">
                {
                allCourse.map((course,index)=>(
                    <div key={index} className="row text-center mb-2 ">
                    <div className="col-4">
                <h3 className="text-dark text-left">{course.name}</h3>
                    </div>
                    <div className="col-4">
                      <Link
                        className="btn btn-success"
                        to={`/course/update/${course._id}`}
                      >
                        <span className="">Update</span>
                      </Link>
                    </div>
                    <div className="col-4">
                      <button onClick={()=>performDelete(course._id)} className="btn btn-danger">
                        Delete
                      </button>
                    </div>
                  </div>
                ))
            }
            </div>
            </div>
        </div>
    )
}
export default Managecourse;
