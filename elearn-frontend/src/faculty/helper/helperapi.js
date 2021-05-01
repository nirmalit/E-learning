import { isauthenticated } from '../../auth/helper/credential';
import { API } from './../../backend';



export const createdepartment=(dept)=>{
    const {user,token}=isauthenticated();
    return fetch(`${API}/department/create/${user._id}`,{
        method:"POST",
        headers:{
            Authorization:`Bearer ${token}`,
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body: JSON.stringify(dept)
    })
    .then(res=>res.json())
    .catch((err)=>console.log(err))
}

export const allDepartments=()=>{
    return fetch(`${API}/departments`)
            .then((res)=>res.json())
            .catch(err=>console.log(err))
}

export const deleteDepartments=(deptId)=>{
    const {user,token}=isauthenticated();
    return fetch(`${API}/department/${deptId}/${user._id}`,{
        method:"DELETE",
        headers:{
        Authorization:`Bearer ${token}`
    }
    }).then(res=>res.json())
    .catch(err=>console.log(err))
}

export const updateDepartment=(deptId,dept)=>{
    const {user,token}=isauthenticated();
    return fetch(`${API}/department/${deptId}/${user._id}`,{
        method:"PUT",
        headers:{
            Authorization:`Bearer ${token}`,
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body: JSON.stringify(dept)
    })
    .then((res)=>res.json())
    .catch((err)=>console.log(err))
}
export const getDepartment=(deptId)=>{
    return fetch(`${API}/department/${deptId}`).then(res=>res.json()).catch(err=>console.log(err))
}