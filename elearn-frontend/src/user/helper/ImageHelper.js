import React from 'react'
import { isauthenticated } from '../../auth/helper/credential';
import { API } from '../../backend';

const ImageHelper=({profile})=> {
    const {user,token}=isauthenticated()
    const imageUrl=profile? `${API}/profile/photo/${user._id}`:"https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80";
    return (
        <div className="rounded">
            <img
              src={imageUrl}
              alt="photo"
              style={{ maxHeight: "100%", maxWidth: "100%" }}
              class="rounded"
            />
        </div>
    )
}
export default ImageHelper;