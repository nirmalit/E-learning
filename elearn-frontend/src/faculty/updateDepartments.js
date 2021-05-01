import React,{ useState,useEffect } from 'react'
import Base from '../core/base'
import { getDepartment,updateDepartment } from './helper/helperapi'
import { Link } from 'react-router-dom';

const UpdateDepartments = ({match}) => {
    const [success, setSuccess] = useState(false);
    const [values,setValues]=useState({
        name:"",
        description:"",
        price:"",
        stock:"",
        photo:"",
        categories:[],
        category:"",
        loading:false,
        error:"",
        createdProduct:"",
        getaRedirect:false,
        formData:""
    });
    const preLoader=categoryId=>{
        getDepartment(categoryId).then(data=>{
        if(data.error){
          setValues({...values,error:data.error})
        }else{
          setValues({...values,
                        name:data.name,
                        category:data._id,
                        formData:new FormData()
                    });
        //console.log(values);
        }
      })
      .catch(error=>console.log(error))
    }
    const handleChange=name=>event=>{
        const value=event.target.value;
        formData.set(name,value);  //doubt_____
        setValues({...values,[name]:value});
        console.log(formData)
    }

    useEffect(()=>{
      preLoader(match.params.categoryId);
    },[])
    const goBack=()=>{
        return(
            <div className="btn btn-dark mt-2 text-white ml-2">
                <Link to="/category/manage">Back to DashBoard</Link>
            </div>
        );
    }
    const successMessage=()=>{
        return (
        <div className="alert alert-success mt-3" role="alert"
        style={{display : createdProduct? "" : "none"}}
        >
        <h4>{createdProduct} is successfully updated..!</h4>
        </div>
        );
    }
  
      const errorMessage=()=>(
        <div className="alert alert-danger mt-3" role="alert"
        style={{display:error ? "":"none"}}
        >
        <h4>failed to Update a Category</h4>
        <h5>Reason :</h5><p>{error}</p>
        </div>
      )

      const { name,
        category,
        loading,
        error,createdProduct,
        getaRedirect,
        formData
     } =values;
      const onSubmit=event=>{
        event.preventDefault();
        let temp={name:values.name};
        setValues({ ...values, error: "", loading: true });
        
        updateDepartment(match.params.categoryId,temp).then(data=>{
            if(data.error){
              setValues({...values,error:data.error})
            }else{
              setValues({...values,
              name:"",
            loading:false,
            getaRedirect:true,
            createdProduct:data.name
            })
            }
          })
      }
      const ProductForm = () => (
        <form >
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <button type="submit" onClick={onSubmit} className="btn btn-outline-success">
            Update Category
          </button>
        </form>
      );
    return (
        <div>
            <Base title="Updating" description="Departments values updation" />
            {goBack()}
            <div className="row">
            <div className="col-8 offset-2 bg-white">
                {errorMessage()}
                {successMessage()}
                {ProductForm()}
            </div>
            </div>
            </div>
    )
}


export default UpdateDepartments;