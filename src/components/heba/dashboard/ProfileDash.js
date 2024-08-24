import React from "react";
import styleprofile from "./Dashboard.module.css"

const ProfileDash = () => {
    return(
        <div className={styleprofile.content}>
            <div className="row justify-content-end">
            <div className={styleprofile.dots} >
                        <div></div>
                        <div></div>
                        <div></div>
            </div> 
            </div>
        </div>
    )
}
export default ProfileDash