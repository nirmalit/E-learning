import { isauthenticated } from "../../auth/helper/credential";
import { API } from "../../backend";


export const getUserProfile=()=>{
    const {user,token}=isauthenticated()
    return fetch(`${API}/user/profile/${user._id}`,{
        headers:{Authorization:`Bearer ${token}`}
    }).then((response)=>{
        return response.json();
    }).catch(error=>console.log(error));
}
