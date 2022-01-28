import React, { useState, useContext, useEffect } from "react"
import {Context} from './Context'
import Login from "./Login"
import { useNavigate } from "react-router-dom";
import profile from '../images/Profile.png'
import "../styles/Profile.css"
import axios from 'axios'

function Profile(){

    let navigate = useNavigate();

    const {isLogin,userInfo, reassignUserInfo, clearLoginCookies } = useContext(Context);

    const [username, setUsername] = useState("");

    const fetchNewProfile = async () => {
        const res = await axios.get(`https://trivial-trivia-backend.herokuapp.com/user/${userInfo.userName}`);
        reassignUserInfo(res.data)
    }

    const logOut = () =>{
        clearLoginCookies()
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
            <div className="profile-details">
                <h1>Username: <span className="username">{userInfo.userName}</span></h1>
                {userInfo.bestCategory != "No test taken yet" && 
                    <div className="profile-ranking">
                        <h1>Best category: <span className="best-category">{userInfo.bestCategory}</span></h1>
                        <h1>Top score: <span className="best-score">{userInfo.bestScore}/10</span></h1>
                        <h1>Last login: <span className="last-seen" maxlength="10">{userInfo.lastSeen}</span></h1>
                    </div>
                }
            </div>

                {userInfo.bestCategory == "No test taken yet" && 
                    <div>
                        <h1 className="no-tests-taken">No test details available. Take a test to see your top scores!</h1>
                    </div>
                }
                <button className="logout-button" onClick={() => logOut()}>LOGOUT</button>
        </div>
    )
}

export default Profile