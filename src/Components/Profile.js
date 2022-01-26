import React, { useState } from "react"
import Login from "./Login"

function Profile(){

    const [username, setUsername] = useState("");
    const [displayProfile, setDisplayProfile] = useState(false);

    return (
        <div className="Profile">
            {displayProfile ? <Profile /> : <Login />}
        </div>

    )
}

export default Profile