import React from "react";
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import Course from "./core/Course";
import Menubar from "./core/menubar";
import Faculty from "./faculty/Faculty";
import Student from "./user/student";
import Updateprofile from "./user/updateprofile";
import FacultyRoutes from './faculty/helper/FacultyRoutes';
import Createcategory from './faculty/createCategory';
import ManageDepartment from "./faculty/manageDepartment";
import UpdateDepartments from "./faculty/updateDepartments";
import { Createcourse } from './course/Createcourse';
import Managecourse from "./course/Managecourse";
import Updatecourse from "./course/Updatecourse";

const Routes=()=>{
    return(
        <Router>
            <Menubar />
            <Switch>
                <Route  exact path="/" exact component={Course} />
                <Route path="/faculty" exact component={Faculty} />
                <Route path="/student" exact component={Student} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />

                <Route path="/profile/update" exact component={Updateprofile} />

                <FacultyRoutes path="/category/create" exact component={Createcategory} />
                <FacultyRoutes path="/faculty/category/update/:categoryId" exact component={UpdateDepartments} />
                <FacultyRoutes path="/category/manage" exact component={ManageDepartment} />
                <FacultyRoutes path="/course/create" exact component={Createcourse} />
                <FacultyRoutes path="/course/manage" exact component={Managecourse} />
                <FacultyRoutes path="/course/update/:courseId" exact component={Updatecourse} />
            </Switch>
        </Router>
    );
}
export default Routes;