import React,{useState} from 'react'
import { isauthenticated } from '../auth/helper/credential';
import Base from '../core/base';
import { createdepartment } from './helper/helperapi';


const Createcategory = () => {
    const [name,setName]=useState("");
    const [error,setError]=useState("");
    const [success,setSuccess]=useState("");
    
    const {user,token}=isauthenticated();
    const changeHandler= event =>{
        setError("");
        setName(event.target.value);
    }
    const successMessage=()=>{
        if(success){
            return(
                <h1 className="text-success">Department is Successfully Created</h1>
            )
        }
    }
    const errorMessage=()=>{
        if(error){
            return(
                <h1 className="text-warning">Failed to create Department</h1>
            )
        }
    }
    const onsubmit= event =>{
        event.preventDefault();
        setError("")
        setSuccess(false);
        
        //backend req
        createdepartment({name}).then(data=>{
            if(data.error){
                setError(true);
                console.log(data.error);
            }else{
                setError("");
                setSuccess(true);
                setName("")
            }
        })
    }
    const addCategoryForm=()=>(
        <form>
            <div className="form-group">
                <label for="catg-name">
                    Department name
                </label>
                <input type="text" className="form-control" id="catg-name" placeholder="Ex. Programming" onChange={changeHandler} />
            </div>
            <button className="btn btn-outline-info" onClick={onsubmit}>Create Category</button>
        </form>
    );
    return (
        <div>
            <Base title="Department" description="Create new Departments" />
            <div className="row bottom p-5">
                <div className="col-md-8 offset-md-2 bg-white rounded">
                    {successMessage()}
                    {errorMessage()}
                    {addCategoryForm()}
                </div>
            </div>
        </div>
    )
}


export default Createcategory;