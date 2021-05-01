import React,{useState,useEffect} from 'react'
import Base from '../core/base';
import { allDepartments, deleteDepartments } from './helper/helperapi';
import { Link } from 'react-router-dom';

const ManageDepartment = () => {
    const [category, setCategory] = useState([]);
    const preload=()=>{ 
        allDepartments().then((data)=>{
            if(data.error){
                console.log("error occured");
            }else{
                setCategory(data);
            }
        })
    }
    const performDelete=deptID=>{
        deleteDepartments(deptID).then((data)=>{
            if(data.error){
                console.log("Can not able to delete");
                console.log(data.error)
            }else{
                preload();
            }
        })
    }
    useEffect(() => {
        preload()
    }, []);
    return (
        <div>
            <Base title="Department Managements" description="Managing all your department" />
            <div className="row container-fluid">
        <div className="col-md-8 offset-md-2  bottom border rounded">
          <h2 className="text-center text-white my-3">Products List</h2>
            {
                category.map((cat,index)=>(
                    <div key={index} className="row text-center mb-2 ">
                    <div className="col-4">
                <h3 className="text-dark text-left">{cat.name}</h3>
                    </div>
                    <div className="col-4">
                      <Link
                        className="btn btn-success"
                        to={`/faculty/category/update/${cat._id}`}
                      >
                        <span className="">Update</span>
                      </Link>
                    </div>
                    <div className="col-4">
                      <button onClick={() => {performDelete(cat._id)}} className="btn btn-danger">
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


export default ManageDepartment;