import React, { useState } from "react"
import Login from "./Login"
import Navbar from "./Navbar"

import { LoginContext } from './Contexts/LoginContext'

function Profile(){

    const [username, setUsername] = useState("");
    const [displayProfile, setDisplayProfile] = useState(false);

    return (
        <>
        {/* <Navbar /> */}
        {/* <div className="Profile">
        <LoginContext.Provider value = {{ username, setUsername, setDisplayProfile }}>
            {displayProfile ? <Profile /> : <Login />}
        </LoginContext.Provider>
        </div> */}
        </>
    )
}

export default Profile