import { isauthenticated } from '../../auth/helper/credential';
import { API } from './../../backend';
import { getUserProfile } from './../../user/helper/userHelper';


export const enrollCourse=(courseID)=>{
    const {user,token}=isauthenticated()
    return fetch(`${API}/course/join/${courseID}/${user._id}`,{
        method:"PUT",
        headers:{
            Authorization:`Bearer ${token}`,
        }
    }).then(res=>res.json())
      .catch(err=>console.log(err))
}

export const enrolledCourses=()=>{
    getUserProfile().then(data=>{
        return data.courses
    })
}