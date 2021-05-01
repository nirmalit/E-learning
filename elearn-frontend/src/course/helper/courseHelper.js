import { isauthenticated } from '../../auth/helper/credential';
import { API } from './../../backend';


export const createCourse=(course)=>{
    const {user,token}=isauthenticated();
    console.log(course);
    return fetch(`${API}/course/create/${user._id}`,{
        method:"POST",
        headers:{
            Authorization:`Bearer ${token}`,
            Accept:"application/json",
            "Content-Type":"application/json",
        },
        body: JSON.stringify(course)
    }).then(res=>res.json())
      .catch(err=>console.log(err))
}
export const updatecourse=(courseID,course)=>{
    const {user,token}=isauthenticated();
    return fetch(`${API}/course/${courseID}/${user._id}`,{
        method:"PUT",
        headers:{
            Authorization:`Bearer ${token}`,
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body: JSON.stringify(course)
    }).then((res)=>res.json())
      .catch(err=>console.log(err))
}
export const deleteCourse=(courseID)=>{
    const {user,token}=isauthenticated();
    return fetch(`${API}/course/${courseID}/${user._id}`,{
        method:"DELETE",
        headers:{
            Authorization:`Bearer ${token}`,
        },
    }).then((res)=>res.json())
      .catch(err=>console.log(err))
}


export const getCourse=(courseID)=>{
    return fetch(`${API}/course/${courseID}`).then(res=>res.json()).catch(err=>console.log(err))
}

export const allCourses=()=>{
    return fetch(`${API}/course`).then(res=>res.json()).catch(err=>console.log(err))
}