import React,{useState,useEffect} from 'react'
import { isauthenticated, updateUser } from '../auth/helper/credential';
import Base from '../core/base'
import { getUserProfile } from './helper/userHelper';

const Updateprofile = () => {
    const {user ,token}=isauthenticated();
    const [values,setValues]=useState({
        name:"",
        email:"",
        phone:"",
        photo:"",
        bio:"",
        password:"",
        loading:"",
        city:"",
        school:"",
        company:"",
        gender:"",
        country:"",
        error:"",
        success:"",
        getRedirect:false,
        formData:''
    });
    const preLoader=()=>{
        getUserProfile().then(data=>{
            setValues({
                ...values,
                name:data.name,
                email:data.email,
                phone:data.phone,
                bio:data.bio,
                city:data.city,
                school:data.school,
                company:data.company,
                gender:data.gender,
                country:data.country,
                formData:new FormData()
            })
        })
      }
      useEffect(() => {
        preLoader();
      }, [])

      const changesHandler=name=>event=>{
        const value=name==="photo"? event.target.files[0]:event.target.value;
        formData.set(name,value);  //doubt_____
        setValues({...values,[name]:value});
    }
      const {name,email,phone,bio,city,school,company,gender,country,formData,success,error}=values;
    const successMessage=()=>{
        return (
        <div className="alert alert-success mt-3" role="alert"
        style={{display : success? "" : "none"}}
        >
        <h4>Your Account is successfully Updated..!</h4>
        </div>
        );
      }

      const onSubmit=event=>{
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });
        updateUser(formData).then(data=>{
            if(data.error){
              setValues({...values,error:data.error})
            }else{
              setValues({...values,
                name:"",
                email:"",
                phone:"",
                photo:"",
                bio:"",
                password:"",
                city:"",
                school:"",
                company:"",
                gender:"",
                country:"",
                error:"",
                loading:false,
                getaRedirect:true,
                success:"Account Created"
            })
            }
          })
      }
  
      const errorMessage=()=>(
        <div className="alert alert-danger mt-3" role="alert"
        style={{display:error ? "":"none"}}
        >
        <h4>Failed to Update your Account</h4>
        <h5>Reason :</h5><p>{error}</p>
        </div>
      )
      const signupForm=()=>(
        <form className="mt-4"> 
            <div className="form-group mb-3"> 
                <label className="text-dark">Name</label> 
                <input value={name} onChange={changesHandler("name")} className="form-control" type="text"/> 
            </div> 
            <div className="form-group mb-3"> 
                <label className="text-dark">About You</label> 
                <input value={bio} onChange={changesHandler("bio")} className="form-control" type="text"/> 
            </div> 
            <div className="row">
                <div className="col-6">
            <div className="form-group mb-3"> 
                <label className="text-dark">Email ID</label> 
                <input value={email} onChange={changesHandler("email")} className="form-control" type="email"/> 
            </div> 
            <div className="form-group mb-3"> 
                <label className="text-dark">Phone</label> 
                <input value={phone} onChange={changesHandler("phone")} className="form-control" type="Number"/> 
            </div>
            <div className="form-group mb-3"> 
                <label className="text-dark">City/Village</label> 
                <input value={city} onChange={changesHandler("city")} className="form-control" type="text"/> 
            </div>
            <div className="form-group mb-3"> 
                <label className="text-dark">Country</label> 
                <input value={country} onChange={changesHandler("country")} className="form-control" type="text"/> 
            </div>
            </div>
            <div className="col-6">
                <div className="form-group mb-3"> 
                <label className="text-dark">Company</label> 
                <input value={company} onChange={changesHandler("company")} className="form-control" type="text"/> 
                </div>
                <div className="form-group mb-3"> 
                <label className="text-dark">School</label> 
                <input value={school} onChange={changesHandler("school")} className="form-control" type="text"/> 
                </div>
                <div className="form-group mb-3"> 
                <label className="text-dark">Gender</label> 
                <input value={gender} onChange={changesHandler("gender")} className="form-control" type="text"/> 
                </div> 
                <div className="form-group">
                <span>YOUR PROFILE PHOTO</span>
                <label className="btn btn-block">
                    <input
                        onChange={changesHandler("photo")}
                        type="file"
                        name="photo"
                        accept="image"
                        placeholder="choose a file"    
                    />
                </label>
                </div>
                </div>
            </div>
            <button onClick={onSubmit} className="btn btn-dark btn-block mb-1">submit</button> 
        </form> 
    )
    return (
        <div>
            <Base title="Profile Update" description="Change your profile details" />
            
            <div className="row">
                <div className="col-8 offset-2">
                {errorMessage()}
                {successMessage()}
                {signupForm()}
                </div>
            </div>

        </div>
    )
}
export default Updateprofile;