import React, { useState, useContext, useEffect } from "react"
import {Context} from './Context'
import Login from "./Login"
import { useNavigate } from "react-router-dom";
import profile from '../images/Profile.png'


function Profile(){

    let navigate = useNavigate();

    const {isLogin,userInfo} = useContext(Context);

    console.log(isLogin)

    const [username, setUsername] = useState("");

    useEffect(()=>{
        document.title = "User Profile - Trivial Trivia"

        if(!isLogin){
            navigate('/Login')
        }
    },[])

    return (
        <div className="Profile">
            <img className='profile' src={profile} alt="profile"></img>
            <h1>{userInfo.userName}</h1>
            <h1>{userInfo.bestCategory}</h1>
            <h1>{userInfo.bestScore}</h1>
            <h1>{userInfo.lastSeen}</h1>
        </div>

    )
}

export default Profile