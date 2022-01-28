import React, { useState, useContext, useEffect } from "react"
import {Context} from './Context'
import Login from "./Login"
import { useNavigate } from "react-router-dom";
import profile from '../images/Profile.png'
import axios from 'axios'


function Profile(){

    let navigate = useNavigate();

    const {isLogin,userInfo, reassignUserInfo} = useContext(Context);

    console.log(isLogin)

    const fetchNewProfile = async () => {
        const res = await axios.get(`https://trivial-trivia-backend.herokuapp.com/user/${userInfo.userName}`);
        reassignUserInfo(res.data)
    }

    useEffect(()=>{
        document.title = "User Profile - Trivial Trivia"

        if(isLogin){
            fetchNewProfile()
        }

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