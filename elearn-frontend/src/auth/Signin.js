import React,{ useState } from "react";
import signinLogo from "../images/signin.png"
import {Link,Redirect} from "react-router-dom";
import {signin,isauthenticated,authenticate, signout} from "./helper/credential";

import Base from '../core/base';
const Signin=()=>{
    const [values,setvalues]=useState({
        email:"",
        password:"",
        error:"",
        loading:false,
        didRedirect:false
    });
    const { email,password,error,loading,didRedirect }=values;
    const { user } =isauthenticated();

    const changesHandler= name =>event=>{
        setvalues({
            ...values,
            error:false,
            [ name ]:event.target.value
        })
    }

    const onsubmit = event =>{
        event.preventDefault();
        setvalues({...values,error:false,loading:true});
        signin({ email,password })
        .then(data=>{
            if(data?.error){
                setvalues({...values,error:data.error,loading:false});
            }else{
                authenticate(data,()=>{
                    setvalues({...values,
                    didRedirect:true});
                })
            }
        }).catch(console.log("error in signin"))
    }

    const performRedirect=()=>{
        if(didRedirect){
            if(user && user.role===1){
                return <Redirect to="/faculty" />
            }else{
                return <Redirect to="/student" />
            }
        }
        if(isauthenticated()){
            return <Redirect to="/" />;
        }
    }

    const loadMessage=()=>(
        <div className="row">
            <div className=" col-sm-6 offset-3">
                <div className="alert alert-success"
                style={{display:loading?"":"none"}} >
                    Loading....
                </div>
            </div>
        </div>
    )
    const errorMessage=()=>(
        <div className="row">
            <div className="col-sm-6 offset-3 text-center">
                <div className="alert alert-danger shadow mb-3 mt-3"
                style={{display:error?"":"none"}} >
                    {error}
                </div>
            </div>
        </div>
    )

    const signinForm=()=>( 
        <div className="container rounded mt-3">
            <div className="row"> 
                <div className="col-6"> 
                    <img src={signinLogo} alt="sign in" className="img-fluid" /> 
                </div> 
                <div className="col-6"> 
                    <span className="align-middle"> 
                    <form className="mt-4"> 
                        <div className="form-group mb-3"> 
                            <label className="text-dark">Email ID</label> 
                            <input value={email} onChange={changesHandler("email")} className="form-control" type="email"/> 
                        </div> 
                        <div className="form-group mb-3"> 
                            <label className="text-dark">Password</label> 
                            <input value={password} onChange={changesHandler("password")} className="form-control" type="password"/> 
                        </div> 
                        <button onClick={onsubmit} className="btn btn-dark btn-block mb-1">submit</button> 
                    </form> 
                    </span> 
                </div> 
            </div> 
            </div> )
        
    return(
        <div>
        <Base title="Sign In" description="Log in your account" />
        {errorMessage()}
        {loadMessage()}
        {signinForm()}
        {performRedirect()}
        </div>
)
}

export default Signin;