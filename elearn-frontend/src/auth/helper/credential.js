
import { API } from './../../backend';



export const signup=user=>{
    return fetch(`${API}/signup`,{
        method:"POST",
        body: user
    }
    )
    .then(response=>{ return response.json()})
    .catch(err=>console.log(err))
};
export const updateUser=User=>{
    const {user,token}=isauthenticated();
    return fetch(`${API}/update/${user._id}`,{
        method:"PUT",
        headers:{
            Authorization:`Bearer ${token}`
        },
        body:User
    }
    )
    .then(res=>{return res.json()})
    .catch(err=>console.log(err))

}
export const signin=(user)=>{
    return fetch(`${API}/signin`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body: JSON.stringify(user)
    }
    )
    .then((res)=>res.json())
    .catch((err)=>console.log(err))
};
export const authenticate=(data,next)=>{
    if(typeof window!=="undefined"){
        localStorage.setItem("jwt",JSON.stringify(data))
        next();
    }
}
export const signout=next=>{
    if(typeof window!=="undefined"){
        localStorage.removeItem("jwt");
        next();
    }
    return fetch(`${API}/signout`,{
        method:"GET"
    })
    .then(response=>console.log("signout success"))
    .catch(err=>console.log(err))
};
export const isauthenticated=()=>{
    if(typeof window=="undefined"){
        return false;
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"));
    }else{
        return false;
    }
}