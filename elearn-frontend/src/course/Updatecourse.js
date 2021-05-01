import React, { useEffect, useState } from 'react'
import { isauthenticated } from '../auth/helper/credential';
import Base from '../core/base'
import { allDepartments } from '../faculty/helper/helperapi';
import { createCourse, getCourse } from './helper/courseHelper';
import {updatecourse} from './helper/courseHelper'

const Updatecourse = ({match}) => {
    const {user ,token}=isauthenticated();
    const [values,setValues]=useState({
        name:"",
        description:"",
        department:"",
        alldepartments:[],
        team:[],
        tempTeam:"",
        capacity:0,
        createdCourse:"",
        getRedirect:false,
        error:"",
        loading:""
    });
    const preLoader=(courseId)=>{
        getCourse(courseId).then(data=>{
            if(data.error){
                setValues({...values,error:data.error})
            }else{
                setValues({
                    ...values,
                    name:data.name,
                    description:data.description,
                    department:data.department,
                    capacity:data.capacity
                })
            }
        })
        
    }
    useEffect(() => {
        preLoader(match.params.courseId)
    }, [])
    const changesHandler= name =>event=>{
        if(name!="capacity"){
        setValues({
            ...values,
            error:false,
            [ name ]:event.target.value
        })
        }else{
            setValues({
                ...values,
                error:false,
                [ name ]:parseInt(event.target.value)
            })
        }
    }
    const {name,description,capacity,department,error,createdCourse,alldepartments}=values;
    const onSubmit=event=>{
        event.preventDefault();
        setValues({...values,error:"",loading:true});
        updatecourse(match.params.courseId,{name,department,description,capacity}).then(data=>{
            if(data.error){
                setValues({...values,error:data.error});
            }else{
                setValues({
                    name:"",
                    description:"",
                    department:"",
                    alldepartments:[],
                    capacity:0,
                    getRedirect:false,
                    error:"",
                    loading:"",
                    createdCourse:data.message
                })
            }
        })
    }
    const courseForm=()=>(
        <div className="container">
        <form className="mt-4"> 
            <div className="form-group mb-3"> 
                <label className="text-dark">Name</label> 
                <input value={name} onChange={changesHandler("name")} className="form-control" type="text"/> 
            </div> 
            <div className="form-group mb-3"> 
                <label className="text-dark">Description</label> 
                <input value={description} onChange={changesHandler("description")} className="form-control" type="text"/> 
            </div> 
            <div className="form-group mb-3"> 
                <label className="text-dark">Capacity</label> 
                <input value={capacity} onChange={changesHandler("capacity")} className="form-control" type="Number"/> 
            </div> 
            <div className="form-group mb-3">
                <select
                    onChange={changesHandler("department")}
                    className="form-control"
                    placeholder="department"
                >
                    <option>Department</option>
                    {(alldepartments)&&(
                        alldepartments.map((dept,index)=>(
                            <option key={index} value={dept._id}>{dept.name}</option>
                        ))
                    )}
                </select>
            </div>
            <button onClick={onSubmit} className="btn btn-dark btn-block mb-1">submit</button> 
        </form>
        </div> 
    )
    const successMessage=()=>{
      
        return (
        <div className="alert alert-success mt-3" role="alert"
        style={{display : createdCourse? "" : "none"}}
        >
        <h4>Course is successfully Updated..!</h4>
        </div>
        );
      }
  
      const errorMessage=()=>(
        <div className="alert alert-danger mt-3" role="alert"
        style={{display:error ? "":"none"}}
        >
        <h4>failed to Update Course</h4>
        <h5>Reason :</h5><p>{error}</p>
        </div>
      )
    return (
        <div>
            <Base title="Course" description="Create Course"/>
            {successMessage()}
            {errorMessage()}
            {courseForm()}
        </div>
    )
}


export default Updatecourse;