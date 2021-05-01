import React,{useState,useEffect} from 'react'
import Base from '../core/base'

import { Link } from 'react-router-dom';
import ImageHelper from './helper/ImageHelper';
import { getUserProfile } from './helper/userHelper';


const Student = () => {

    const [profile,setProfile]=useState({
        error:"",
        photo:"",
        name:"",
        email:"",
        bio:"",
        phone:"",
        city:"",
        gender:""
    });
    const preloader=()=>{
        getUserProfile().then((data)=>{
            if(data.error){
                setProfile({
                    ...profile,
                    error:"Error Occured"
                });
            }else{
                setProfile({
                    name:data.name,
                    email:data.email,
                    bio:data.bio,
                    phone:data.phone,
                    city:data.city,
                    gender:data.gender
                });
            }
        }
        ).catch(err=>console.log("error Occured at facultiy api calls"))
    }
    useEffect(() => {
        preloader()
    }, [])
    const {name,email,bio,city,phone}=profile
    return (
        <div className="row">
            <div className="col-4 card shadow">
                <ImageHelper profile={profile.name} />
                <div>
                <ul className="card-body text-center">
                        <li className="list-group-item ">
                            <Link to="/" className="nav-link">
                             Join Course
                            </Link>
                            <Link to="/" className="nav-link">
                             Manage Course
                            </Link>
                            <Link to="/profile/update" className="nav-link">
                             Update Your Profile 
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="col-8">
            <Base title="Faculty Dashboard" description="Managing the account and course" />
            <div className="container mt-3">
                <ul className="card-body shadow text-center">
                <li className="list-group-item d-flex flex-row">
                    <span className="badge badge-success text-dark">Name</span>{name}
                </li>
                <li className="list-group-item d-flex flex-row">
                     <span className="badge badge-success text-dark">Email</span>{email}
                </li>
                <li className="list-group-item d-flex flex-row">
                    <span className="badge badge-success text-dark">Phone</span>{phone}
                </li>
                <li className="list-group-item d-flex flex-row">
                    <span className="badge badge-success text-dark">Bio</span>{bio}
                </li>
                <li className="list-group-item d-flex flex-row">
                    <span className="badge badge-success text-dark">City</span>{city}
                </li>
                </ul>
            </div>
            </div>
        </div>
    )
}

export default Student;