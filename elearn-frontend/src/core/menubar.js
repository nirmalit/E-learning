import React from 'react';
import {Link,withRouter} from 'react-router-dom';
import { isauthenticated, signout } from '../auth/helper/credential';


const active=(history ,path)=>{
    if(history.location.pathname===path){
        return {color:"white"};
    }else{
        return {color:"Black"};
    }
}
const Menubar=({history})=>(
<div className="basecolour mb-3">
    <div className="container">
        <ul className="nav nav-tabs">
            <li  className="nav-item">
                <Link style={active(history,"/")} className="nav-link" to="/">
                    All Courses
                </Link>
            </li>
            <li>
            {(isauthenticated())&&(isauthenticated().user.role===0)&&(
                <Link style={active(history,"/courses")} className="nav-link" to="/courses">
                    My Courses
                </Link>
            )}
            </li>
            <li>
            {(isauthenticated())&&(isauthenticated().user.role===0)&&(
                <Link style={active(history,"/student")} className="nav-link" to="/student">
                    Student Dashboard
                </Link>)
                }
            </li>
            <li>
            {(isauthenticated())&&(isauthenticated().user.role===1)&&(
                <Link style={active(history,"/faculty")} className="nav-link" to="/faculty">
                    Faculty Dashboard
                </Link>)}
            </li>
            <li>
            {(!isauthenticated())&&(
                <Link style={active(history,"/signin")} className="nav-link" to="/signin">
                    Sign In
                </Link>)
            }
            </li>
            <li>
                {(!isauthenticated())&&(
                <Link style={active(history,"/signup")} className="nav-link" to="/signup">
                    Sign Up
                </Link>)
                }
            </li>
            <li  className="nav-item">
                        {(isauthenticated() )&&(
                             <span className="nav-link  text-warning" onClick={()=>{
                                signout(()=>{
                                    history.push("/");
                                    })
                                }}>
                               SIGN OUT
                               </span>
                        )}
            </li>
        </ul>
    </div>
</div>);

export default withRouter(Menubar);
